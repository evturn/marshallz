const fs = require('fs')
const util = require('util')
const c = require('chalk')

module.exports = compiler => {
  const data = util.inspect(compiler.options, { depth: null })
  fs.writeFile('build/config.log.js', data, writeFinished)
}

function writeFinished(e) {
  if (e) { console.log(c.bgRed(util.inspect(e))) }
  else   { console.log(c.bgBlue('File created.')) }
}
