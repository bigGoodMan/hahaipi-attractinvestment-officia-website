const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devEnv = process.env.NODE_ENV === 'development'
module.exports = [
  {
    test: /\.(css|styl|stylus)$/,
    use: [devEnv ? 'style-loader' : {
      loader: MiniCssExtractPlugin.loader, // 防止css重复打包
      options: {
        // you can specify a publicPath here
        // by default it uses publicPath in webpackOptions.output
        publicPath: './'
        // hmr: devEnv // Hot Module Reloading
      }
    }, {
      loader: 'css-loader' // translates CSS into CommonJS
    }, {
      loader: 'postcss-loader'
      // options: {
      //   plugins: () => { // 已经卸载postcss.config.js配置里面
      //     return [
      //       require('postcss-import')(), // 一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
      //       require('autoprefixer')({ browsers: ['last 5 versions'] })
      //     ]
      //   }
      // }
    }, {
      loader: 'stylus-loader' // compiles stylus to CSS
    }
    ]
  },
  {
    test: /\.html$/,
    // html中的img标签
    use: ['html-withimg-loader']
  },
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  },
  {
    test: /\.(png|jpg|gif|jpeg)$/,
    use: [{
      // 需要下载file-loader和url-loader
      loader: 'url-loader',
      options: {
        limit: 5 * 1024, // 小于这个时将会已base64位图片打包处理
        outputPath: 'img', // 图片文件输出的文件夹
        name: '[name].[ext]',
        publicPath: devEnv ? './img' : '../img' // 浏览器图片加载路径
      }
    }]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  }
]
