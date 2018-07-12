var gulp = require('gulp')
var debounce = require('./scripts/helper').debounce
var dev = require('./dev')
var stop, restart
gulp.task('watchFile', function (cb) {
  var watcher = gulp.watch('src/pages/**/*.jsx')
  watcher.on('change', function (event) {
    if (event.type != 'changed') {
      restart()
    }
  })
  cb()
})

gulp.task('startServer', ['watchFile'], function () {
  stop = dev()
  restart = debounce(function () {
    stop()
    stop = dev()
  }, 3000)
})

gulp.task('default', ['watchFile', 'startServer'])