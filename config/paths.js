// jslint     - all
// less
// fonts
// css        - vendor only
// browserify - client and vendor js
// js         - client only

module.exports = {
  jshint: {
    src: [
      'assets/js/**/*.js',
      '!assets/js/lib/**/*.js',
      'config/**/*.js',
      'server.js',
      'gulpfile.js'
    ],
    watch: [
      'assets/js/**/*.js',
      '!assets/js/lib/**/*.js',
      'config/**/*.js',
      'server.js',
      'gulpfile.js'
    ]
  },
  less: {
    src: 'assets/less/*.less',
    watch: 'assets/less/**/*.less',
    dest: 'dist/css',
    filename: 'less.css'
  },
  font: {
    src: 'assets/fonts/**.*',
    dest: 'dist/fonts'
  },
  css: {
    src: [
    'assets/css/lib/bootstrap.css',
    'assets/css/style.css'
    ],
    dest: 'dist/css',
    filename: 'vendor.css'
  },
  js: {
    src: [
      'assets/js/models/**/*.js',
      'assets/js/collections/**/*.js',
      'assets/js/views/**/*.js',
      'assets/js/main.js'
    ],
    watch: [
      'assets/js/models/**/*',
      'assets/js/collections/**/*.js',
      'assets/js/views/**/*',
      'assets/js/main.js'
    ],
    dest: 'dist/js',
    filename: 'scripts.min.js',
    vendor: {
      src: [
        'assets/js/lib/jquery.js',
        'assets/js/lib/underscore.js',
        'assets/js/lib/backbone.js',
        'assets/js/lib/firebase.js',
        'assets/js/lib/backbonefire.js',
        'assets/js/lib/promise.js',
        'assets/js/lib/promise-done-6.1.0.js',
        'assets/js/lib/promise-done-6.1.0.min.js',
        'assets/js/lib/moment.js',
        'assets/js/lib/livestamp.js',
        'assets/js/lib/bootstrap.js'
      ],
      dest: 'dist/js',
      filename: 'vendor.js'
    }
  },
    img: {
    src: 'assets/img/**/*',
    dest: 'dist/img'
  }
};