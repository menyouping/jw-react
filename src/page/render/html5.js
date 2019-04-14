import { Col, Row } from 'antd';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import ReactMarkdown from 'react-markdown';


export default class Html5Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '<html>/n    <head>\n        <title>Hello World</title>\n     </head>\n    <body>\n    </body>\n</html>',
        }
    }

    editorDidMount = (editor, monaco) => {
        this.editor = editor;
    }

    onEditorChange = (newValue, e) => {
        this.setState({
            ...this.state,
            code: newValue,
        });
    }


    render() {
        const { code} = this.state;
        const options = {
            selectOnLineNumbers: true
        };
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <MonacoEditor
                            width="420"
                            height="460"
                            language="javascript"
                            theme="vs-dark"
                            value={code}
                            options={options}
                            onChange={this.onEditorChange}
                            editorDidMount={this.editorDidMount}
                        />
                    </Col>
                    <Col span={12}>
                        <ReactMarkdown source={code} />
                    </Col>
                </Row>
            </div>
        );
    }
}
