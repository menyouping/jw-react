
import CodeEditor from "@/component/CodeEditor";
import jslParser from "@/component/_utils/jsl.parser.min.js";
import vkbeautify from "@/component/_utils/vkbeautify.js";
import React from 'react';

export default class JSONEditor extends React.Component {

  handleBeautify = (content) => {
    jslParser.parse(content);
    return vkbeautify.json(content);
  }

  handleUnformat = (content) => {
    jslParser.parse(content);
    return vkbeautify.jsonmin(content).trim();
  }

  render() {
    const defaultConfig = {
      cacheKey:'jsonEditor',
      contentType: 'json',
      code: '{\n    "hello": "Hello from Jay!"\n}',
    };
    return (
      <CodeEditor
        handleBeautify={this.handleBeautify}
        handleUnformat={this.handleUnformat}
        defaultConfig = {defaultConfig}
      />
    );
  }
}