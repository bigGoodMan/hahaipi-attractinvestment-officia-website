const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rules = require('./rules.js')
console.log(path.resolve())
console.log(path.join())
console.log(__dirname)
const devEnv = process.env.NODE_ENV === 'development' // 开发环境
// 得到入口地址
function getEntrysFunc (pagePath, type = 'js') {
  // 兼容mac和windows // (\\/|\\\\)**(\\/|\\\\)*
  const globPath = `${pagePath}/**/*.${type}`
  const globArr = glob.sync(globPath)
  const entry = {}
  globArr.forEach(v => {
    entry[path.basename(v, `.${type}`)] = v
  })
  return entry
}
function getHtmlsFunc (fileObj) {
  const htmlWebpackPluginArr = []
  Object.keys(fileObj).forEach((name) => {
    htmlWebpackPluginArr.push(new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: `./src/pages/${name}/index.html`,
      chunks: [name],
      minify: devEnv ? false : {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 压缩代码
        removeAttributeQuotes: true // 去除属性引用 (除了有空格的引用 所有的引号会去除)
      }
    }))
  })
  return htmlWebpackPluginArr
}
const entry = getEntrysFunc(path.resolve('src/pages/'))
module.exports = {
  entry,
  module: { // 关于模块配置
    rules: [...rules] // 模块规则（配置 loader、解析器等选项）
  },
  externals: { // 不会从node_modules打包进去
    'jquery': 'jQuery'
  },
  plugins: [ // 插件
    // 暴露全局变量
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // 静态资源输出
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/assets'),
      to: './assets',
      ignore: ['.*']
    }]),
    ...getHtmlsFunc(entry)
  ]
}
