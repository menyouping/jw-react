// Change theme plugin

// import MergeLessPlugin from 'antd-pro-merge-less';
import AntDesignThemePlugin from 'antd-theme-webpack-plugin';
import path from 'path';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default config => {
  // 将所有 less 合并为一个供 themePlugin使用
  const outFile = path.join(__dirname, '../.temp/ant-design-pro.less');
  const stylesDir = path.join(__dirname, '../src/');

  // config.plugin('merge-less').use(MergeLessPlugin, [
  //   {
  //     stylesDir,
  //     outFile,
  //   },
  // ]);

  config.plugin('ant-design-theme').use(AntDesignThemePlugin, [
    {
      antDir: path.join(__dirname, '../node_modules/antd'),
      stylesDir,
      varFile: path.join(__dirname, '../node_modules/antd/lib/style/themes/default.less'),
      mainLessFile: outFile, //     themeVariables: ['@primary-color'],
      indexFileName: 'index.html',
      generateOne: true,
    },
  ]);

  config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
    {
      languages: ['xml','mysql','velocity','javascript','json','html', 'markdown'],
    },
  ]);

  // config.optimization
  // .runtimeChunk(false)
  // .splitChunks({
  //   chunks: 'async',
  //   name: 'vendors',
  //   maxInitialRequests: Infinity,
  //   minSize: 0,
  //   cacheGroups: {
  //       vendors: {
  //           test(module) {
  //             return false;
  //           },
  //           name(module) {
  //             return 'misc';
  //           }
  //       },
  //   },
  // });

};
