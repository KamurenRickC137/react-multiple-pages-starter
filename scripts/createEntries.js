const path = require('path')
const fs = require('fs')

var template = fs.readFileSync(path.resolve(__dirname, 'entry.template'), 'utf-8')

function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

function createEntryFile(p, componentPath) {
  const pa = p.replace(/[^/^\\]*?\.jsx$/, '')
  mkdirsSync(pa)
  var t = template.replace('{{}}', componentPath)
  return new Promise((resolve, reject) => {
    fs.writeFile(p, t, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve(p)
      }
    })
  })
}
module.exports = async function (entries) {
  const entriesPath = path.resolve(__dirname, '..', 'src', '.entries')
  var promises = []
  for (const key in entries) {
    if (entries.hasOwnProperty(key)) {
      const element = entries[key]
      const entryPath = path.resolve(__dirname, '..', element)
      if (!fs.existsSync(entryPath)) {
        promises.push(createEntryFile(entryPath, '@pages/' + key + '.jsx'))
      }
    }
  }
  await Promise.all(promises)
}