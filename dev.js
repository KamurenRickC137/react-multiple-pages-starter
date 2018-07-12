const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server/lib/Server')
const webpackDevServer = require('webpack-dev-server')
const resolveFile = require('./scripts/resolveFile')
const merge = require('webpack-merge')
const globalConfig = require('./webpack.dev.config')
async function start() {
  const { entry, htmlWebpacklist } = resolveFile()
  for (const key in entry) {
    if (entry.hasOwnProperty(key)) {
      const element = entry[key];
      entry[key] = ['react-hot-loader/patch', element]
    }
  }
  const config = merge(globalConfig, {
    entry,
    plugins: htmlWebpacklist,
  })
  const devServerOptions = {
    host: '0.0.0.0',
    ...config.devServer,
    stats: {
      colors: true,
    },
    noInfo: true,
    progress: true,
  }

  webpackDevServer.addDevServerEntrypoints(config, devServerOptions)
  const compiler = webpack(config)
  var server = new WebpackDevServer(compiler, devServerOptions)

  return await new Promise((resolve) => {
    server.listen(devServerOptions.port, devServerOptions.host, () => {
      console.log('\nStarting server on http://' + devServerOptions.host + ':' + devServerOptions.port)
      resolve(function () {
        server.close()
      })
    })
  })
}

module.exports = start