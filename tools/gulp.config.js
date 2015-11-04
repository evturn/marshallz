'use strict';
const gulp = require('gulp');
const gutil = require('gulp-util');
const $ = require('gulp-load-plugins')();

module.exports.paths = {
  dest: {
    css: 'client/dist/css',
    js: 'client/dist/js',
    img: 'client/dist/img'
  },
  less: {
    src: 'client/build/less/*.less',
    watch: 'client/build/less/**/*.less',
    filename: 'style.css',
    min: 'style.min.css'
  },
  js: {
    src: 'client/dist/js/bundle.js'
  },
  eslint: {
    src: [
      'client/build/js/**/*.js',
      '!client/build/js/web_modules/*',
      'config/**/*.js',
      'routes/**/*.js',
      'shared/**/*.js',
      'gulpfile.js'
    ]
  },
  views: {
    src: '*.hbs'
  },
  img: {
    src: 'client/build/img/**/*'
  },
};

module.exports.opts = {
  browserSync: {
      proxy: 'localhost:3000',
      port: 3000
  },
  babel: {
    modules: 'common'
  },
  plumber: {
    errorHandler: function(err) {
      gutil.beep();
      console.log(err);
      $.notify(err);
      this.emit('end');
    }
  },
  notify: {
    eslint: (file) => {
      if (file.eslint.errorCount === 0) {
        return;
      }

      let errors = file.eslint.messages.map((data) => {
        let location = `Line: ${data.line}:${data.column} |\n${data.message}`;
        return location;
      });

      let message = `File: ${file.relative} (${file.eslint.errorCount} errors)\n${errors}\n`;
      return message;
    }
  },
  imagemin: {
    progressive: true
  },
  autoprefixer: {
    browsers: [
      '> 1%',
      'last 2 versions',
      'firefox >= 4',
      'safari 7',
      'safari 8',
      'IE 8',
      'IE 9',
      'IE 10',
      'IE 11'
    ],
    cascade: false
  },
    sass: {
    sourceComments: 'map',
    sourceMap: 'sass',
    outputStyle: 'nested'
  }
};