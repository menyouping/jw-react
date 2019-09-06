
import { Button, Col, Row } from 'antd';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import MonacoEditor from 'react-monaco-editor';


export default class Html5Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'normal',
            code: localStorage.getItem('html5') || "<html>\n<head>\n    <title>Hello World</title>\n</head>\n<body>\n    <label>Hello from Jay</label>\n</body>\n</html>",
            editorHeight: 800,
            isPreview: false,
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
            editorHeight: Math.max(18 * newValue.split(/\n/g).length, 800),
        });
        localStorage.setItem('html5', newValue);
    }

    onPreview = () => {
        this.setState({
            ...this.state,
            isPreview: !this.state.isPreview,
        });
    }

    render() {
        const { code, editorHeight, isPreview } = this.state;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <div>
                <Row>
                    <Col span={24} style={{ paddingBottom: '15px' }}>
                        <Button onClick={this.onPreview} type="primary">{isPreview ? '隐藏' : '预览'}</Button>
                    </Col>
                </Row>
                <Row style={{background: '#ffffff'}}>
                    <Col span={isPreview ? 12 : 24}>
                        <MonacoEditor
                            width={isPreview ? 400 : '100%'}
                            height={editorHeight}
                            language="html"
                            theme="vs-dark"
                            value={code}
                            options={options}
                            onChange={this.onEditorChange}
                            editorDidMount={this.editorDidMount}
                        />
                    </Col>
                    <Col span={isPreview ? 12 : 0}>
                        <div dangerouslySetInnerHTML={{ __html: code }}>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

