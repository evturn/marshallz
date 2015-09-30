"use strict";

let gulp = require('gulp'),
    gutil = require('gulp-util'),
    $ = require('gulp-load-plugins')();

module.exports = {

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
    eslint: function(file) {
      if (file.eslint.errorCount === 0) {
        return false;
      }
      let errors = file.eslint.messages.map(function(data) {
        return '(' + data.line + ':' + data.column + ') ' + data.message;
      }).join('\n');

      return file.relative + ' (' + file.eslint.errorCount + ' errors)\n' + errors;
    },
    jshint: function(file) {
      if (file.jshint.success) {
        return false;
      }
      let errors = file.jshint.results.map(function(data) {
        if (data.error) {
          return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join("\n");
      return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
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