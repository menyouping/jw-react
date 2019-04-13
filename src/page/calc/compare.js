import React from 'react';
import { MonacoDiffEditor } from 'react-monaco-editor';

export default class CompareEditor extends React.Component {

  editorDidMount = (editor) => {
    this.editor = editor;
    let original = this.editor.getOriginalEditor();
    original.updateOptions({ readOnly: false });
  }

  render() {
    const options = {
      //renderSideBySide: false
    };
    return (
      <MonacoDiffEditor
        width="1135"
        height="540"
        language="javascript"
        theme="vs-dark"
        options={options}
        original="原始内容"
        value="新内容"
        editorDidMount={this.editorDidMount}
      />
    );
  }
}