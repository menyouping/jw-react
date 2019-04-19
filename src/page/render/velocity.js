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
        this.state = {
            mode: 'normal',
            tplCode: "This is ${owner}'s home",
            argCode: '{"owner": "jay"}',
            result: '',
            editorHeight: 460,
            activeTab: 'tpl',
            operations: <Button onClick={this.onRender} type="primary">渲染</Button>
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
    }

    onArgEditorChange = (newValue, e) => {
        this.setState({
            ...this.state,
            argCode: newValue,
        });
    }

    onTabChange = (key) => {
        this.setState({
            ...this.state,
            activeTab: key,
        });
    }

    onRender = () => {
        let newArgCode = this.beautifyArgCode();
        let asts = Velocity.parse(this.state.tplCode);
        let context = JSON.parse(newArgCode);
        this.setState({
            ...this.state,
            argCode: newArgCode,
            result: (new Compile(asts)).render(context, []),
            activeTab: 'result',
        });
    }

    beautifyArgCode = () => {
        try {
            let content = this.state.argCode;
            if (content && content.length > 1 && content.indexOf("\"") == 0 && content.lastIndexOf("\"") == content.length - 1) {
                content = content.substring(1, content.length - 1);
            }
            content = this.handleBeautify(content);
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
        const { tplCode, argCode, result, activeTab, editorHeight, operations } = this.state;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <Tabs activeKey={activeTab} tabBarExtraContent={operations} onChange={this.onTabChange}>
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
