
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { notification, Row, Col, Button } from 'antd';
import jslFormat from "@/component/_utils/jsl.format.min.js";
import jslParser from "@/component/_utils/jsl.parser.min.js";
import { Icon } from 'antd';

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '{\n    "hello": "Hello from Jay!"\n}',
      mode: 'normal',
      height: 480
    }
  }

  editorDidMount = (editor) => {
    this.editor = editor;
  }

  beautifyCode = () => {
    if (this.editor) {
      try {
        let content = this.editor.getValue();
        if (content && content.length > 1 && content.indexOf("\"") == 0 && content.lastIndexOf("\"") == content.length - 1) {
          content = content.substring(1, content.length - 1);
        }
        jslParser.parse(content);
        content = jslFormat.formatJson(content);
        this.editor.setValue(content);
      } catch (exp) {
        notification['error']({
          message: '错误提醒',
          description: exp.toString(),
        });
      }
    }
  }

  unformatCode = () => {
    if (this.editor) {
      try {
        let content = this.editor.getValue();
        if (content && content.length > 1 && content.indexOf("\"") == 0 && content.lastIndexOf("\"") == content.length - 1) {
          content = content.substring(1, content.length - 1);
        }
        jslParser.parse(content);
        content = this.unformatJson(content);
        this.editor.setValue(content);
      } catch (exp) {
        notification['error']({
          message: '错误提醒',
          description: exp.toString(),
        });
      }
    }
  }

  unformatJson = (json) => {
    if (typeof json === 'string') {
      json = JSON.parse(json);
    }
    json = JSON.stringify(json);
    return json.trim();
  }

  changeSize = () => {
     if(this.state.mode == 'normal') {
         this.setState({...this.state, mode:'large', height: 1000});
     } else {
        this.setState({...this.state, mode:'normal', height: 480});
     }
  }

  render() {
    const { code } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
    };
    return (
      <div>
        <Row>
          <Col span={24}>
            <Button onClick={this.beautifyCode} type="primary">美化</Button>
            <Button onClick={this.unformatCode} type="default" style={{ marginLeft: '15px' }}>一行</Button>
          </Col>
        </Row>
        <Row style={{ paddingTop: '15px' }}>
          <Col span={24}>
            <MonacoEditor
              width="1135"
              height={this.state.height}
              language="json"
              theme="vs-dark"
              value={code}
              options={options}
              editorDidMount={this.editorDidMount}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} align="right">
            {
              this.state.mode == 'normal' ? 
              <Icon type="down-square" onClick= {this.changeSize} />
              :
              <Icon type="up-square" onClick= {this.changeSize}/>
            }
          </Col>
        </Row>
      </div>
    );
  }
}