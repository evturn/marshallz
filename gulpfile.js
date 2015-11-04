'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');
const $ = require('gulp-load-plugins')();
const paths = require('./config/gulp.config').paths;
const opts = require('./config/gulp.config').opts;
const shell = require('gulp-shell');

////
// `$ npm run watch`
////////////////////////
gulp.task('watch', ['webpack:watch', 'gulp:watch', 'browser:init']);

////
// Gulp Watch
////////////////////////
gulp.task('gulp:watch', () => {
  gulp.watch(paths.js.src, ['browser:reload']),
  gulp.watch(paths.less.watch, ['run:less']);
  gulp.watch(paths.eslint.src, ['eslint']);
  gulp.watch(paths.views.src, ['browser:reload']);
});

////
// Shell Scripts
////////////////////////
gulp.task('webpack:watch',  $.shell.task('webpack --watch &'));

////
// Browser Sync
////////////////////////
gulp.task('browser:init', () => {
  setTimeout(() => {
    console.log('Browser Sync initialized');
    browserSync.init(opts.browserSync);
  }, 9000); // Timeout allows webpack to finish initial bundle
});

gulp.task('browser:reload', () => {
  browserSync.reload();
});

////
// LESS
//////////////////////
const cb = () => { console.log('Finished with that.'); };
gulp.task('run:less', (cb) => {
  runSequence('less', 'browser:reload', () => {
    cb();
  });
});

gulp.task('less', () => {
  return gulp.src(paths.less.src)
    .pipe($.plumber(opts.plumber))
    .pipe($.less())
    .pipe($.rename(paths.less.filename))
    .pipe(gulp.dest(paths.dest.css))
    .on('error', opts.plumber.errorHandler)
    .pipe($.autoprefixer(opts.autoprefixer))
    .pipe($.cssmin())
    .pipe($.rename(paths.less.min))
    .pipe(gulp.dest(paths.dest.css)).on('error', gutil.log);
});

////
// ESLint
//////////////////////
gulp.task('eslint', () => {
  return gulp.src(paths.eslint.src)
    .pipe($.plumber(opts.plumber))
    .pipe($.eslint())
    .on('error', opts.plumber.errorHandler)
    .pipe($.eslint.format('stylish'))
    .pipe($.notify(opts.notify.eslint));
});

////
// Imagemin
//////////////////////
gulp.task('img', () => {
  return gulp.src(paths.img.src)
  .pipe($.imagemin(opts.imagemin))
  .pipe(gulp.dest(paths.dest.img));
});