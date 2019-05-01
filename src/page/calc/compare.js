import React from 'react';
import { MonacoDiffEditor } from 'react-monaco-editor';

export default class CompareEditor extends React.Component {

  editorDidMount = (editor) => {
    this.editor = editor;
    let original = this.editor.getOriginalEditor();
    original.updateOptions({ readOnly: false });
  }

  onChange = (value) => {
    localStorage.setItem('compare_value', value);
  }

  render() {
    const options = {
      //renderSideBySide: false
    };
    let originalCode = "原始内容";
    let valueCode = localStorage.getItem('compare_value') || "新内容";
    return (
      <MonacoDiffEditor
        width="1135"
        height="540"
        language="javascript"
        theme="vs-dark"
        options={options}
        original={originalCode}
        value={valueCode}
        editorDidMount={this.editorDidMount}
        onChange={this.onChange}
      />
    );
  }
}