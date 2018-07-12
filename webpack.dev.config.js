'use strict'
var merge = require('webpack-merge')
var base = require('./webpack.base.config')
var webpack = require('webpack')
var path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
module.exports = merge(base, {
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new ProgressBarPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [{
      test: /\.(sa|sc)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
    }]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    publicPath: '/',
    port: 3000,
    inline: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:8080',
        chnageOrigin: true,
        secure: false,
      },
    },
    host: '0.0.0.0',
    disableHostCheck: true,
  }
})
