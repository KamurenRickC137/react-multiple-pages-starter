const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const base = require('./webpack.base.config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const merge = require('webpack-merge')
const resolveFile = require('./scripts/resolveFile')
const path = require('path')
const { entry, htmlWebpacklist } = resolveFile()
module.exports = merge(base, {
  entry,
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[name].chunk.[hash:8].js',
  },
  mode: 'production',
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader', 'less-loader'],
    }]
  },
  optimization: {
    splitChunks: {
      minChunks: 2,
    }
  },
  plugins: [
    new CleanWebpackPlugin(['./dist']),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    ...htmlWebpacklist,
  ]
})
