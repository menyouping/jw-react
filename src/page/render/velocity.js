import { Button, Tabs, notification } from 'antd';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import jslParser from "@/component/_utils/jsl.parser.min.js";
import vkbeautify from "@/component/_utils/vkbeautify.js";
import Velocity from 'velocityjs';


const TabPane = Tabs.TabPane
const Compile = Velocity.Compile;

export default class VelocityEditor extends React.Component {

    constructor(props) {
        super(props);
        let tplCode = localStorage.getItem('velocity_tplCode');
        let argCode = localStorage.getItem('velocity_argCode');
        this.state = {
            mode: 'normal',
            tplCode: tplCode || "This is ${owner}'s home",
            argCode: argCode || '{"owner": "jay"}',
            result: '',
            editorHeight: 800,
            activeTab: 'tpl',
        }
    }

    tplEditorDidMount = (editor, monaco) => {
        this.tplEditor = editor;
        this.tplEditor.focus();
    }

    argEditorDidMount = (editor, monaco) => {
        this.argEditor = editor;
    }

    resultEditorDidMount = (editor, monaco) => {
        this.resultEditor = editor;
    }

    onTplEditorChange = (newValue, e) => {
        this.setState({
            ...this.state,
            tplCode: newValue,
        });
        localStorage.setItem('velocity_tplCode', newValue);
    }

    onArgEditorChange = (newValue, e) => {
        this.setState({
            ...this.state,
            argCode: newValue,
        });
        localStorage.setItem('velocity_argCode', newValue);
    }

    onTabChange = (key) => {
        this.setState({
            ...this.state,
            activeTab: key,
        });
    }

    onRender = () => {
        let newArgCode = this.onBeautifyArgCode();
        let asts = Velocity.parse(this.state.tplCode);
        let context = JSON.parse(newArgCode);
        this.setState({
            ...this.state,
            argCode: newArgCode,
            result: (new Compile(asts)).render(context, []),
            activeTab: 'result',
        });
    }

    onBeautifyArgCode = () => {
        try {
            let content = this.state.argCode;
            if (content && content.length > 1 && content.indexOf("\"") == 0 && content.lastIndexOf("\"") == content.length - 1) {
                content = content.substring(1, content.length - 1);
            }
            content = this.handleBeautify(content);
            this.argEditor.setValue(content);

            localStorage.setItem('velocity_argCode', newArgCode);
            return content;
        } catch (exp) {
            this.setState({
                ...this.state,
                activeTab: 'arg',
            });
            this.argEditor.focus();
            notification['error']({
                message: '参数错误',
                description: exp.toString(),
            });
        }
    }

    handleBeautify = (content) => {
        jslParser.parse(content);
        return vkbeautify.json(content);
    }


    render() {
        const { tplCode, argCode, result, activeTab, editorHeight } = this.state;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <Tabs activeKey={activeTab} tabBarExtraContent={
                <div>
                    {
                        activeTab == 'arg' ?
                            <Button onClick={this.onBeautifyArgCode} type="default" style={{marginRight:10}}>美化</Button>
                            :
                            ''
                    }
                    <Button onClick={this.onRender} type="primary">渲染</Button>
                </div>
            } onChange={this.onTabChange}>
                <TabPane tab="源码" key="tpl">
                    <MonacoEditor
                        height={editorHeight}
                        language="xml"
                        theme="vs-dark"
                        value={tplCode}
                        options={options}
                        onChange={this.onTplEditorChange}
                        editorDidMount={this.tplEditorDidMount}
                    />
                </TabPane>
                <TabPane tab="参数" key="arg">
                    <MonacoEditor
                        height={editorHeight}
                        language="json"
                        theme="vs-dark"
                        value={argCode}
                        options={options}
                        onChange={this.onArgEditorChange}
                        editorDidMount={this.argEditorDidMount}
                    />
                </TabPane>
                <TabPane tab="结果" key="result">
                    <MonacoEditor
                        height={editorHeight}
                        language="xml"
                        theme="vs-dark"
                        value={result}
                        options={options}
                        editorDidMount={this.resultEditorDidMount}
                    />
                </TabPane>
            </Tabs>
        );
    }
}
