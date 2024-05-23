'use strict';
const path = require('path');

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  devServer: {
    historyApiFallback: true,
  },
  // webpack相关
  configureWebpack: {
    resolve: {
      alias: {
        '@select': path.resolve(__dirname, 'packages/select/src'),
      },
    },
  },
  chainWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config.output = Object.assign(config.output, {
        libraryExport: 'default',
      });
    } else {
      // 为开发环境修改配置...
    }
  },
};
