global.__TEST__ = process.env.NODE_ENV === 'test'
global.__PROD__ = process.env.NODE_ENV === 'production'
require('babel-register')({})

if (__TEST__) {
  console.log('sandboxing')
  require('./sandbox')
}

if (__PROD__) {
  require('./prod')
}
