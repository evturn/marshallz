global.__PROD__ = process.env.NODE_ENV === 'production'
global.__TEST__ = process.env.NODE_ENV === 'test'
require('babel-register')({})

if (__TEST__) {
  require('./sandbox')
}

if (__PROD__) {
  require('./prod')
}
