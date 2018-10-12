const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    "@": path.resolve(__dirname, 'src'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
  proxy: {
    "/api": {
      "target": "http://10.1.14.9:4024",
      "changeOrigin": true,
      "secure":false,
      "pathRewrite":{'^/api':''}
    },
    "/app": {
      // "target": "http://10.1.14.166:4024",
      "target": "http://testbid.51rz.com",
      "changeOrigin": true,
      "secure":false,
      // "pathRewrite":{'^/app':''}
    }
  }
};
//http://10.1.20.199:4024
// http://devbid.51rz.com 测试环境
