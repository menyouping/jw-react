
import { Button, Col, notification, Row } from 'antd';
import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { isFunction } from 'util';

export default class CodeEditor extends React.Component {
  constructor(props) {
    super(props);

    let code = localStorage.getItem(props.defaultConfig['cacheKey']) || props.defaultConfig['code'];
    this.state = {
      cacheKey: 'codeEditor',
      code: '',
      mode: 'normal',
      height: 480,
      editorHeight: 460,
      contentType: 'json',
      ...props.defaultConfig,
      code: code,
      editable: true
    }
    this.handleBeautify = isFunction(this.props.handleBeautify) ? this.props.handleBeautify : (content) => { return content };
    this.handleUnformat = isFunction(this.props.handleUnformat) ? this.props.handleUnformat : (content) => { return content };
  }

  editorDidMount = (editor) => {
    this.editor = editor;
    this.editor.focus();
  }

  onBeautifyCode = () => {
    let {code: content} = this.state;
    try {
      if (content && content.length > 1 && content.indexOf("\"") == 0 && content.lastIndexOf("\"") == content.length - 1) {
        content = content.substring(1, content.length - 1);
      }
      content = this.handleBeautify(content);

      localStorage.setItem(this.state.cacheKey, content);
      this.setState({...this.state, code: content});
    } catch (exp) {
      notification['error']({
        message: '错误提醒',
        description: exp.toString(),
      });
    }
  }

  onUnformatCode = () => {
    let {code: content} = this.state;
    try {
      if (content && content.length > 1 && content.indexOf("\"") == 0 && content.lastIndexOf("\"") == content.length - 1) {
        content = content.substring(1, content.length - 1);
      }
      content = this.handleUnformat(content);

      localStorage.setItem(this.state.cacheKey, content);
      this.setState({...this.state, code: content});
    } catch (exp) {
      notification['error']({
        message: '错误提醒',
        description: exp.toString(),
      });
    }
  }

  onEditorChange = (newValue, e) => {
    this.setState({
      ...this.state,
      code: newValue,
      editorHeight: Math.max(18 * newValue.split(/\n/g).length, 460)
    });

    localStorage.setItem(this.state.cacheKey, newValue);
  }

  render() {
    const { code, contentType, editorHeight,editable } = this.state;
    const options = {
      selectOnLineNumbers: true,
      renderSideBySide: false,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: true,
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
                height={editorHeight}
                language={contentType}
                value={code}
                options={this.options}
                theme="vs-dark"
                onChange={this.onEditorChange}
                editorDidMount={this.editorDidMount}
              />
          </Col>
        </Row>
      </div>
    );
  }
}