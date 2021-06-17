const ThemeColorReplacerPlugin = require("./webpack_theme_plugin");
const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
  transpileDependencies: ['webpack-dev-server/client'],  //
  chainWebpack: config => {
    config.entry.app = ['babel-polyfill', './src/main.js'];
  },
  publicPath: './', //vcu-admin/
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      ThemeColorReplacerPlugin(),
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: new RegExp('\\.(js|css)$'),
        // 只处理大于xx字节 的文件，默认：0
        threshold: 10240,
        // 示例：一个1024b大小的文件，压缩后大小为768b，minRatio : 0.75
        minRatio: 0.8, // 默认: 0.8
        // 是否删除源文件，默认: false
        deleteOriginalAssets: false
      })
    ]
  }

}

