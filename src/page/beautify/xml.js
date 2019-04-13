
import CodeEditor from "@/component/CodeEditor";
import vkbeautify from "@/component/_utils/vkbeautify.js";
import React from 'react';

export default class XMLEditor extends React.Component {

  handleBeautify = (content) => {
    content = vkbeautify.xml(content);
    return content;
  }

  handleUnformat = (content) => {
    return content = vkbeautify.xmlmin(content).trim();
  }

  render() {
    const defaultConfig = {
      code: '<root>\n    <a>Hello,World</a>\n</root>',
      contentType: 'xml'
    };
    return (
      <CodeEditor
        handleBeautify={this.handleBeautify}
        handleUnformat={this.handleUnformat}
        defaultConfig={defaultConfig}
      />
    );
  }
}