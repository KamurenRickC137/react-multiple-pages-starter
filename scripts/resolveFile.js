const fs = require('fs')
const path = require('path')


const HtmlWebpackPlugin = require('html-webpack-plugin')
const pagePath = path.resolve(__dirname, '../', 'src', 'pages')
function resolveFile(parentPath, htmlWebpacklist, entry) {
  var pa = fs.readdirSync(parentPath)
  pa.forEach(function (currentName) {
    const currentPath = path.resolve(parentPath, currentName)
    var info = fs.statSync(currentPath)
    if (info.isFile() && /.jsx?$/.test(currentName)) {
      const relativePath = currentPath.replace(pagePath + '/', '').replace(/.jsx?$/, '')
      entry[relativePath] = './src/pages/' + currentPath.replace(pagePath + '/', '')
      htmlWebpacklist.push(new HtmlWebpackPlugin({
        template: 'index.html',
        filename: relativePath + '.html',
        chunks: [relativePath, 'react', 'reactDOM'],
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
  return {
    htmlWebpacklist,
    entry,
  }
}