module.exports = {

  dest: {
    css: 'public/dist/css',
    js: 'public/dist/js',
    img: 'public/dist/img'
  },
  less: {
    src: 'public/build/less/*.less',
    watch: 'public/build/less/**/*.less',
    filename: 'style.css',
    min: 'style.min.css'
  },
  eslint: {
    src: [
      'public/build/js/**/*.js',
      '!public/build/js/vendor/**/*.js',
      '!node_modules',
      'config/**/*.js',
      'gulpfile.js'
    ],
    watch: [
      'public/build/js/models//**/*.js',
      'public/build/js/collections/**/*.js',
      'public/build/js/views/**/*.js',
      'public/build/js/main.js',
      'config/**/*.js',
      'gulpfile.js'
    ]
  },
  webpack: {
    watch: 'public/build/js/tmp/**/*.js'
  },
  js: {
    src: [
      'public/build/js/models//**/*.js',
      'public/build/js/collections/**/*.js',
      'public/build/js/views/**/*.js',
      'public/build/js/main.js'
    ],
    watch: [
      'public/build/js/**/*.js',
      '!public/build/js/vendor/**/*.js'
    ],
    filename: 'scripts.js',
    min: 'scripts.min.js'
  },
  img: {
    src: 'public/build/img/**/*'
  },
  jshint: {
    src: [
      'public/build/js/**/*.js',
      '!public/build/js/vendor/**/*.js',
      'config/**/*.js',
      'gulpfile.js'
    ],
    watch: [
      'public/build/js/**/*.js',
      '!public/build/js/vendor/**/*.js',
      'config/**/*.js',
      'gulpfile.js'
    ]
  }
};