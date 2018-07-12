const path = require('path')
module.exports = {
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      include: path.resolve(__dirname, 'src'),
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        }
      },
    }, {
      test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
      exclude: /node_modules/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'img/[sha512:hash:base64:7].[ext]'
        }
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@pages': path.resolve(__dirname, 'src', 'pages')
    }
  },
}
