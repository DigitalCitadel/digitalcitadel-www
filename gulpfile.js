var gulp = require('gulp');
var browserify = require('browserify');
var stylus = require('gulp-stylus');
var source = require('vinyl-source-stream');
var jeet = require('jeet');
var shell = require('gulp-shell');

// Installs Dependencies
gulp.task('installDeps', shell.task('npm install'));

// Compiles Stylus
gulp.task('stylus', function() {
  return gulp.src('./pre-compiled/stylus/index.styl').pipe(stylus({
    use: [jeet()]
  })).pipe(gulp.dest('./static/css/'));
});

// Starts the watcher
gulp.task('watch', function() {
    gulp.watch("./pre-compiled/stylus/**/*.styl", ['stylus']);
});

// Manual Compile
gulp.task('compile', ['installDeps', 'stylus']);

// Default as Watcher
gulp.task('default', ['installDeps', 'compile', 'watch']);

