import c from 'chalk'
import mongoose from 'mongoose'
export Author from './Author'
export Post from './Post'

global.c = c
mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1/marshallz')
mongoose.connection.on('error', console.error.bind(console, c.red('Connection error:')))
mongoose.connection.once('open',  _ => console.log(c.green('DB connected 🖖🏽')))
