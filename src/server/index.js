global.__DEV__ = process.env.NODE_ENV === 'development'
global.__TEST__ = process.env.NODE_ENV === 'test'
require('babel-register')({})

if (!__TEST__) {
  require('./routes')
}

if (__TEST__) {
  require('./sandbox')
}
