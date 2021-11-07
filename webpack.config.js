const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: ['./src/index.ts'],
    example: './src/example/example.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'CircleProgressbar', // 类库名称
    libraryTarget: 'umd' // 类库打包方式
  },
  resolve: {
    modules: [path.resolve('node_modules')],
    alias: {
      '~': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css']
  },
  module: {
    rules: [{
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif|jpeg|bmp|eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 200 * 1024,
            // outputPath: './',
          }
        }
      }
    ]
  },
  watch: true,
  watchOptions: {
    poll: 2000, //每秒问我多少次
    aggregateTimeout: 1000, //防抖
    ignored: /node_modules|vendor|build|public|resources/
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['index', 'example'],
      filename: './example/index.html'
    })
  ],
  devServer: {
    port: 8087,
    client: {
      progress: true,
    },
    onBeforeSetupMiddleware: function(devServer) {
      devServer.app.get('/', function (req, res) {
        res.redirect('example/index.html')
      });
    },
    open: true,
    hot: true
  }
}
