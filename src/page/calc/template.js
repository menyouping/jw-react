import calc from '@/component/_utils/calc';
import { Button, Col, Icon, message, Radio, Row } from 'antd';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import styles from "./calc.css";

const RadioGroup = Radio.Group;

const DEFAULT_TPL = '{{i}}.{{line}}';
const DEFAULT_FUNC = "function beautify(line, i) {\n    return line.trim();\n}";
export default class TemplateEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'tpl',
            original: 'B\n1\nA\n1',
            handler: DEFAULT_TPL,
            result: '',
            resultVisible: true,
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

    onOriginalEditorChange = (newValue, e) => {
        this.setState({
            ...this.state,
            original: newValue,
        });
    }

    onHandlerEditorChange = (newValue, e) => {
        this.setState({
            ...this.state,
            handler: newValue,
        });
    }

    onOriginalUnique = () => {
        let content = this.originalEditor.getValue();
        content = calc.unique(content);
        this.setState({
            ...this.state,
            original: content,
        });
    }

    onOriginalAsc = () => {
        let content = this.originalEditor.getValue();
        content = calc.sort(content, true);
        this.setState({
            ...this.state,
            original: content,
        });
    }

    onOriginalDesc = () => {
        let content = this.originalEditor.getValue();
        content = calc.sort(content, false);
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
            handler: mode == 'tpl' ? DEFAULT_TPL : DEFAULT_FUNC,
        });
    }

    onTrim = () => {
        this.setState({
            ...this.state,
            mode: 'func',
            handler: DEFAULT_FUNC,
        });
    }

    onRemoveLine = () => {
        this.setState({
            ...this.state,
            mode: 'func',
            handler: "function beautify(line, i) {\n    return line.replace(/^\\d+\\./,'');\n}",
        });
    }

    onBeautify = () => {
        let { original, handler, mode } = this.state;
        if (!original) {
            this.setState({
                ...this.state,
                result: "",
            });
            return;
        }
        if (!handler) {
            message.warning('请设置模板！例如"AAA{{line}}BBB"');
            return;
        }

        let list = [];

        if (mode == "tpl") {
            let tpl = handler.replace(/\s*\n+\s*/g, '');
            original.split('\n').forEach((line, i) => {
                list.push(tpl.replace(/{{line}}/g, line).replace(/{{i}}/g, (i + 1)));
            });
        } else {
            try {
                let funcTpl = "({code})('{line}', {i})".replace('{code}', handler);
                original.split('\n').forEach((line, i) => {
                    let func = funcTpl.replace('{line}', line.replace("'", "\\'")).replace('{i}', i + 1);
                    let result = eval.call(null, func);
                    list.push(result);
                });
            } catch (ex) {
                message.warning('函数编译失败! 错误信息: ' + ex.message);
                return;
            }
        }

        this.setState({
            ...this.state,
            resultVisible: true,
            result: list.join('\n'),
        });
    }

    onCopy = () => {
        this.setState({
            ...this.state,
            original: this.state.result,
            result: ''
        });
    }

    onExpandHandlerEditor = () => {
        this.setState({
            ...this.state,
            resultVisible: !this.state.resultVisible,
        });
    }

    render() {
        const { original, handler, result, resultVisible } = this.state;
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
                    <Col span={resultVisible ? 6 : 0} offset={1}>
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
                        <Icon type={resultVisible ? 'right-square' : 'left-square'} onClick={this.onExpandHandlerEditor} className={styles.span5} />
                    </Col>
                    <Col span={resultVisible ? 6 : 0} offset={1}>
                        <Button type='primary' onClick={this.onBeautify}>美化</Button>
                        <Button type='default' onClick={this.onCopy} className={styles.span10}>复制到A</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <MonacoEditor
                            width="280"
                            height="460"
                            language="javascript"
                            theme="vs-dark"
                            value={original}
                            options={options}
                            onChange={this.onOriginalEditorChange}
                            editorDidMount={this.originalEditorDidMount}
                        />
                    </Col>
                    <Col span={resultVisible ? 8 : 14} offset={1}>
                        <MonacoEditor
                            width={resultVisible ? 360 : 640}
                            height="460"
                            language="javascript"
                            theme="vs-dark"
                            value={handler}
                            options={options}
                            onChange={this.onHandlerEditorChange}
                            editorDidMount={this.handlerEditorDidMount}
                        />
                    </Col>
                    <Col span={resultVisible ? 6 : 0} offset={1}>
                        <MonacoEditor
                            width="280"
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
