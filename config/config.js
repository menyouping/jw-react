import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';

export default {
  singular: true,
  cssLoaderVersion: 2,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      locale: {
        enable: true,
      },
    }],
  ],
  // 路由配置
  routes: pageRoutes,
  // proxy: {
  //   '/dev': {
  //     target: 'https://08ad1pao69.execute-api.us-east-1.amazonaws.com',
  //     changeOrigin: true,
  //   },
  // },
  base: '/jw/',
  runtimePublicPath: true,
  chainWebpack: webpackPlugin,
  history: 'hash',
};
