import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Row, Col, Button, Radio } from 'antd';
import styles from "./template.css";
import RadioGroup from '_antd@3.16.2@antd/lib/radio/group';
import { Card } from 'antd';

export default class TemplateEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'tpl',
            original: '原始值',
            handler: '处理函数',
            result: '结果',
        }
    }

    originalEditorDidMount = (editor, monaco) => {
        this.originalEditor = editor;
    }

    handlerEditorDidMount = (editor, monaco) => {
        this.handlerEditor = editor;
    }

    resultEditorDidMount = (editor, monaco) => {
        this.resultEditor = editor;
    }

    onEditorChange(newValue, e) {
        console.log('onChange', newValue, e);
    }

    onOriginalUnique = () => {
        let content = this.originalEditor.getValue();
        content = this.unique(content);
        this.setState({
            ...this.state,
            original: content,
        });
    }

    onOriginalAsc = () => {
        let content = this.originalEditor.getValue();
        content = this.sort(content, true);
        this.setState({
            ...this.state,
            original: content,
        });
    }

    onOriginalDesc = () => {
        let content = this.originalEditor.getValue();
        content = this.sort(content, false);
        this.setState({
            ...this.state,
            original: content,
        });
    }

    onModeChange = (e) => {
        let mode = e.target.value;
        this.setState({
            ...this.state,
            mode,
        });
    }

    onTrim = () => {
        this.setState({
            ...this.state,
            mode: 'func',
            handler: "function beautify(line, i) {\n    return line.trim();\n}",
        });
    }

    onRemoveLine = () => {
        this.setState({
            ...this.state,
            mode: 'func',
            handler: "function beautify(line, i) {\n    return line.replace(/^\\d+\\./,'');\n}",
        });
    }

    unique = (content) => {
        if (!content) {
            return content;
        }
        let list = this.handle(content);
        return list.join('\n');
    }

    handle = (content) => {
        if (!content) {
            return [];
        }
        let set = new Set();
        let list = [];
        content.split('\n').forEach(line => {
            if (line && !set.has(line)) {
                list.push(line);
                set.add(line);
            }
        });
        return list;
    }

    stringAsc = (a, b) => {
        return a == b ? 0 : (a > b ? 1 : -1);
    }

    stringDesc = (a, b) => {
        return -this.stringAsc(a, b);
    }

    numberAsc = (a, b) => {
        return parseFloat(a) - parseFloat(b);
    }

    numberDesc = (a, b) => {
        return -this.numberAsc(a, b);
    }

    sort = (content, isAsc) => {
        if (!content) {
            return;
        }
        let list = content.split('\n');
        var isNumber = true;
        if (/[a-zA-Z]/.test(content)) {
            isNumber = false;
        } else {
            list.forEach(n => {
                if (isNaN(parseFloat(n)) || !isFinite(n)) {
                    isNumber = false;
                    return false;
                }
            });
        }
        if (isNumber) {
            list = list.sort(isAsc ? this.numberAsc : this.numberDesc);
        } else {
            list = list.sort(isAsc ? this.stringAsc : this.stringDesc);
        }
        content = list.join('\n');
        return content;
    }

    render() {
        const { original, handler, result } = this.state;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <div>
                <Row className={styles.vspan15}>
                    <Col span={6} >
                        <label>数据源A</label>
                    </Col>
                    <Col span={8} offset={1}>
                        <label>处理器B</label>
                    </Col>
                    <Col span={6} offset={2}>
                        <label>结果</label>
                    </Col>
                </Row>
                <Row className={styles.vspan15}>
                    <Col span={6} >
                        <Button type='default' onClick={this.onOriginalUnique}>去重</Button>
                        <Button type='default' onClick={this.onOriginalAsc} className={styles.span10}>升序</Button>
                        <Button type='default' onClick={this.onOriginalDesc} className={styles.span10}>降序</Button>
                    </Col>
                    <Col span={8} offset={1}>
                        <RadioGroup onChange={this.onModeChange} value={this.state.mode}>
                            <Radio value="tpl">模版</Radio>
                            <Radio value="func">函数</Radio>
                        </RadioGroup>
                        <Button type='default' onClick={this.onTrim} className={styles.span10}>去空格</Button>
                        <Button type='default' onClick={this.onRemoveLine} className={styles.span10}>去行号</Button>
                    </Col>
                    <Col span={6} offset={2}>
                        <Button type='default'>复制到A</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <MonacoEditor
                            width="300"
                            height="460"
                            language="javascript"
                            theme="vs-dark"
                            value={original}
                            options={options}
                            onChange={this.onEditorChange}
                            editorDidMount={this.originalEditorDidMount}
                        />
                    </Col>
                    <Col span={8} offset={1}>
                        <MonacoEditor
                            width="370"
                            height="460"
                            language="javascript"
                            theme="vs-dark"
                            value={handler}
                            options={options}
                            onChange={this.onEditorChange}
                            editorDidMount={this.handlerEditorDidMount}
                        />
                    </Col>
                    <Col span={2} className={styles.vcenter}>
                        <Button type='primary'>美化</Button>
                    </Col>
                    <Col span={6} >
                        <MonacoEditor
                            width="300"
                            height="460"
                            language="javascript"
                            theme="vs-dark"
                            value={result}
                            options={options}
                            editorDidMount={this.resultEditorDidMount}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
