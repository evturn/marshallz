var gulp = require('gulp'),
    gutil = require('gulp-util'),  
    G = require('gulp-load-plugins')();
var paths = require('./config/paths');
var options = require('./config/gulp-options');

gulp.task('watch', function() {
  gulp.watch(paths.less.watch, ['less']);
  gulp.watch(paths.jshint.watch, ['lint']);
  gulp.watch(paths.js.watch, ['js']);
});

gulp.task('build', ['js', 'css', 'jslib'])

gulp.task('js', function() {
  return gulp.src(paths.js.src)
    .pipe(G.plumber(options.plumber))
    .pipe(G.concat('scripts.js'))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(G.uglify())
    .pipe(G.rename(paths.js.filename))
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task('jslib', function() {
  return gulp.src(paths.js.vendor.src)
    .pipe(G.plumber(options.plumber))
    .pipe(G.concat(paths.js.vendor.filename))
    .pipe(G.uglify())
    .pipe(G.rename(paths.js.vendor.filename))
    .pipe(gulp.dest(paths.js.vendor.dest));
});

gulp.task('css', function() {
  return gulp.src(paths.css.src)
    .pipe(G.plumber(options.plumber))
    .pipe(G.concat(paths.css.filename))
    .pipe(G.cssmin())
    .pipe(G.rename(paths.css.filename))
    .pipe(gulp.dest(paths.css.dest));
});

gulp.task('lint', function() {
  gulp.src(paths.jshint.src)
    .pipe(G.plumber(options.plumber))
    .pipe(G.jshint())
    .pipe(G.notify(options.notify.jshint));
});