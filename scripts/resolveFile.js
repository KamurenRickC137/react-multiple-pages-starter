const fs = require('fs')
const path = require('path')


const HtmlWebpackPlugin = require('html-webpack-plugin')
const pagePath = path.resolve(__dirname, '../', 'src', 'pages')
const createEntries = require('./createEntries')
function resolveFile(parentPath, htmlWebpacklist, entry) {
  var pa = fs.readdirSync(parentPath)
  pa.forEach(function (currentName) {
    const currentPath = path.resolve(parentPath, currentName)
    var info = fs.statSync(currentPath)
    if (info.isFile() && /.jsx?$/.test(currentName)) {
      const relativePath = currentPath.replace(pagePath + '/', '').replace(/.jsx?$/, '')
      entry[relativePath] = './src/.entries/' + currentPath.replace(pagePath + '/', '')
      htmlWebpacklist.push(new HtmlWebpackPlugin({
        template: 'index.html',
        filename: relativePath + '.html',
        chunks: [relativePath],
        inject: 'body',
      }))
    } else if (info.isDirectory()) {
      resolveFile(path.resolve(parentPath, currentName), htmlWebpacklist, entry)
    }
  })
}




module.exports = function () {
  var htmlWebpacklist = []
  var entry = {}
  resolveFile(pagePath, htmlWebpacklist, entry)
  createEntries(entry)
  return {
    htmlWebpacklist,
    entry,
  }
}