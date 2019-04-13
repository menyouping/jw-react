
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { notification, Row, Col, Button } from 'antd';
import { Icon } from 'antd';
import { isFunction } from 'util';

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '{\n    "hello": "Hello from Jay!"\n}',
      mode: 'normal',
      height: 480,
      contentType: 'json',
      ...props.defaultConfig
    }
    this.handleBeautify = isFunction(this.props.handleBeautify) ? this.props.handleBeautify : (content) => { return content };
    this.handleUnformat = isFunction(this.props.handleUnformat) ? this.props.handleUnformat : (content) => { return content };
  }

  editorDidMount = (editor) => {
    this.editor = editor;
    this.editor.focus();
  }

  onBeautifyCode = () => {
    if (this.editor) {
      try {
        let content = this.editor.getValue();
        if (content && content.length > 1 && content.indexOf("\"") == 0 && content.lastIndexOf("\"") == content.length - 1) {
          content = content.substring(1, content.length - 1);
        }
        content = this.handleBeautify(content);
        this.editor.setValue(content);
      } catch (exp) {
        notification['error']({
          message: '错误提醒',
          description: exp.toString(),
        });
      }
    }
  }

  onUnformatCode = () => {
    if (this.editor) {
      try {
        let content = this.editor.getValue();
        if (content && content.length > 1 && content.indexOf("\"") == 0 && content.lastIndexOf("\"") == content.length - 1) {
          content = content.substring(1, content.length - 1);
        }
        content = this.handleUnformat(content);
        this.editor.setValue(content);
      } catch (exp) {
        notification['error']({
          message: '错误提醒',
          description: exp.toString(),
        });
      }
    }
  }

  changeSize = () => {
    if (this.state.mode == 'normal') {
      this.setState({ ...this.state, mode: 'large', height: 1000 });
    } else {
      this.setState({ ...this.state, mode: 'normal', height: 480 });
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
      ...this.props.options
    };
    return (
      <div>
        <Row>
          <Col span={24}>
            <Button onClick={this.onBeautifyCode} type="primary">美化</Button>
            <Button onClick={this.onUnformatCode} type="default" style={{ marginLeft: '15px' }}>一行</Button>
          </Col>
        </Row>
        <Row style={{ paddingTop: '15px' }}>
          <Col span={24}>
            <MonacoEditor
              width="1135"
              height={this.state.height}
              language={this.state.contentType}
              theme="vs-dark"
              value={this.state.code}
              options={this.options}
              editorDidMount={this.editorDidMount}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} align="right">
            {
              this.state.mode == 'normal' ?
                <Icon type="down-square" onClick={this.changeSize} />
                :
                <Icon type="up-square" onClick={this.changeSize} />
            }
          </Col>
        </Row>
      </div>
    );
  }
}