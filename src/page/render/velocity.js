import { Button, Col, Row, Tabs } from 'antd';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';


const TabPane = Tabs.TabPane


export default class VelocityEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: 'normal',
            code: "# Hello\n* This is jay's home",
            editorHeight: 460,
            isPreview: true,
            operations: <Button onClick={this.onRender} type="primary">渲染</Button>
        }
    }

    editorDidMount = (editor, monaco) => {
        this.editor = editor;
        this.editor.focus();
    }

    onEditorChange = (newValue, e) => {
        this.setState({
            ...this.state,
            code: newValue,
            editorHeight: Math.max(18 * newValue.split(/\n/g).length, 460),
        });
    }

    onRender = () => {
        this.setState({
            ...this.state,
            isPreview: !this.state.isPreview,
        });
    }

    callback = (key) => {
        console.log(key);
    }


render() {
    const { code, editorHeight, isPreview, operations } = this.state;
    const options = {
        selectOnLineNumbers: true
    };
    return (
        <Tabs defaultActiveKey="1" tabBarExtraContent={operations} onChange={this.callback}>
            <TabPane tab="源码" key="1">
                <MonacoEditor
                    height={editorHeight}
                    language="html"
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={this.onEditorChange}
                    editorDidMount={this.editorDidMount}
                />
            </TabPane>
            <TabPane tab="参数" key="2">
                <MonacoEditor
                    height={editorHeight}
                    language="html"
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={this.onEditorChange}
                    editorDidMount={this.editorDidMount}
                />
            </TabPane>
            <TabPane tab="结果" key="3">
                <MonacoEditor
                    height={editorHeight}
                    language="html"
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={this.onEditorChange}
                    editorDidMount={this.editorDidMount}
                />
            </TabPane>
        </Tabs>
    );
}
}
