const webpack = require('webpack');
const path = require('path');
module.exports = {
  devServer: {
    port: 3000,
    host: "0.0.0.0",
    https: false, 
    open: false, //配置自动启动浏览器
    proxy: {
      "/api": {
      target: "http://192.168.0.1",
        ws: true,
        changeOrigin: true
      },
    } 
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, './src'))
  },
}
