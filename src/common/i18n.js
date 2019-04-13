import {
    formatMessage,
  } from 'umi/locale';
  
  const __ = (msgId) => {
    return formatMessage(
        {
          id: msgId,
        },
      );
  };
  export default __;