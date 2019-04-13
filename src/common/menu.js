/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

const menuData = [
  {
    name: '美化工具',
    icon: 'camera',
    path: 'beautify',
    children: [
      {
        name: 'JSON',
        path: 'json',
      },
      {
        name: 'XML',
        path: 'xml',
      },
      {
        name: 'SQL',
        path: 'sql',
      },
    ],
  },
  {
    name: '计算工具',
    icon: 'calculator',
    path: 'calc',
    children: [
      {
        name: '集合',
        path: 'set',
      },
      {
        name: '模版',
        path: 'template',
      },
      {
        name: '比较',
        path: 'compare',
      },
    ],
  },
  {
    name: '渲染工具',
    icon: 'file-markdown',
    path: 'render',
    children: [
      {
        name: 'Velocity',
        path: 'velocity',
      },
      {
        name: 'HTML5',
        path: 'html5',
      },
      {
        name: 'Markdown',
        path: 'markdown',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
