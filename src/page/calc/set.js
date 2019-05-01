import calc from '@/component/_utils/calc';
import { Button, Col, Row } from 'antd';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import styles from "./calc.css";


export default class SetEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aCode: localStorage.getItem('set_acode') || 'B\n1\nA\n1',
            bCode: localStorage.getItem('set_bcode') || "1\n",
            result: '',
        }
    }

    aEditorDidMount = (editor, monaco) => {
        this.aEditor = editor;
    }

    bEditorDidMount = (editor, monaco) => {
        this.bEditor = editor;
    }

    resultEditorDidMount = (editor, monaco) => {
        this.resultEditor = editor;
    }

    onAEditorChange = (newValue, e) => {
        this.setState({
            ...this.state,
            aCode: newValue,
        });
        localStorage.setItem('set_acode', newValue);
    }

    onBEditorChange = (newValue, e) => {
        this.setState({
            ...this.state,
            bCode: newValue,
        });
        localStorage.setItem('set_bcode', newValue);
    }

    onAUnique = () => {
        let content = this.state.aCode;
        content = calc.unique(content);
        this.setState({
            ...this.state,
            aCode: content,
        });
        localStorage.setItem('set_acode', content);
    }

    onAAsc = () => {
        let content = this.state.aCode;
        content = calc.sort(content, true);
        this.setState({
            ...this.state,
            aCode: content,
        });
        localStorage.setItem('set_acode', content);
    }

    onADesc = () => {
        let content = this.state.aCode;
        content = calc.sort(content, false);
        this.setState({
            ...this.state,
            aCode: content,
        });
        localStorage.setItem('set_acode', content);
    }

    onBUnique = () => {
        let content = this.state.bCode;
        content = calc.unique(content);
        this.setState({
            ...this.state,
            bCode: content,
        });
        localStorage.setItem('set_bcode', content);
    }

    onBAsc = () => {
        let content = this.state.bCode;
        content = calc.sort(content, true);
        this.setState({
            ...this.state,
            bCode: content,
        });
        localStorage.setItem('set_bcode', content);
    }

    onBDesc = () => {
        let content = this.state.bCode;
        content = calc.sort(content, false);
        this.setState({
            ...this.state,
            bCode: content,
        });
        localStorage.setItem('set_bcode', content);
    }

    onResultAsc = () => {
        let content = this.state.result;
        content = calc.sort(content, true);
        this.setState({
            ...this.state,
            result: content,
        });
    }

    onResultDesc = () => {
        let content = this.state.result;
        content = calc.sort(content, false);
        this.setState({
            ...this.state,
            result: content,
        });
    }

    onAll = () => {
        let { list } = calc.handle(this.state.aCode + '\n' + this.state.bCode);
        this.setState({
            ...this.state,
            result: list.join('\n'),
        });
    }

    onOverlap = () => {
        let { aCode, bCode } = this.state;
        let result = '';
        if (aCode && bCode) {
            let { set } = calc.handle(aCode);
            var list = [];
            bCode.split('\n').forEach((line) => {
                if (line && set.has(line)) {
                    list.push(line);
                }
            });
            result = list.join('\n');
        }

        this.setState({
            ...this.state,
            result,
        });
    }

    onSubtract = () => {
        let { aCode, bCode } = this.state;
        let result = calc.substract(aCode, bCode);
        this.setState({
            ...this.state,
            result,
        });
    }

    onSubtract2 = () => {
        let { aCode, bCode } = this.state;
        let result = calc.substract(bCode, aCode);
        this.setState({
            ...this.state,
            result,
        });
    }

    render() {
        const { aCode, bCode, result } = this.state;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <div>
                <Row className={styles.vspan15}>
                    <Col span={6} >
                        <label>集合A</label>
                    </Col>
                    <Col span={6} offset={2}>
                        <label>集合B</label>
                    </Col>
                    <Col span={6} offset={3}>
                        <label>结果</label>
                    </Col>
                </Row>
                <Row className={styles.vspan15}>
                    <Col span={6} >
                        <Button type='default' onClick={this.onAUnique}>去重</Button>
                        <Button type='default' onClick={this.onAAsc} className={styles.span10}>升序</Button>
                        <Button type='default' onClick={this.onADesc} className={styles.span10}>降序</Button>
                    </Col>
                    <Col span={6} offset={2}>
                        <Button type='default' onClick={this.onBUnique}>去重</Button>
                        <Button type='default' onClick={this.onBAsc} className={styles.span10}>升序</Button>
                        <Button type='default' onClick={this.onBDesc} className={styles.span10}>降序</Button>
                    </Col>
                    <Col span={6} offset={3}>
                        <Button type='default' onClick={this.onResultAsc}>升序</Button>
                        <Button type='default' onClick={this.onResultDesc} className={styles.span10}>降序</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <MonacoEditor
                            width="280"
                            height="460"
                            language="javascript"
                            theme="vs-dark"
                            value={aCode}
                            options={options}
                            onChange={this.onAEditorChange}
                            editorDidMount={this.aEditorDidMount}
                        />
                    </Col>
                    <Col span={6} offset={2}>
                        <MonacoEditor
                            width="280"
                            height="460"
                            language="javascript"
                            theme="vs-dark"
                            value={bCode}
                            options={options}
                            onChange={this.onBEditorChange}
                            editorDidMount={this.bEditorDidMount}
                        />
                    </Col>
                    <Col span={2} offset={1} className={styles.center}>
                        <Button type='default' onClick={this.onAll} className={styles.margin}>A ∪ B</Button>
                        <Button type='default' onClick={this.onOverlap} className={styles.margin}>A ∩ B</Button>
                        <Button type='default' onClick={this.onSubtract} className={styles.margin}>A - B</Button>
                        <Button type='default' onClick={this.onSubtract2} className={styles.margin}>B - A</Button>
                    </Col>
                    <Col span={6}>
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
