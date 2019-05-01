
import CodeEditor from "@/component/CodeEditor";
import vkbeautify from "@/component/_utils/vkbeautify.js";
import React from 'react';

export default class XMLEditor extends React.Component {

  handleBeautify = (content) => {
    content = vkbeautify.sql(content);
    return content;
  }

  handleUnformat = (content) => {
    return content = vkbeautify.sqlmin(content).trim();
  }

  render() {
    const defaultConfig = {
      cacheKey:'sqlEditor',
      code: 'select * from table',
      contentType: 'sql'
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