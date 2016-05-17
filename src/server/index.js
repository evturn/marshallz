global.__DEV__ = process.env.NODE_ENV === 'development'
require('babel-register')({})
require('./routes')