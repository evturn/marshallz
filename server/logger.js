const chalk = require('chalk')
const ip = require('ip')

const divider = chalk.gray('\n-----------------------------------')

const logger = {
  error: err => {
    console.log(chalk.red(err))
  },
  appStarted: (port, tunnelStarted) => {
    console.log('Server started ' + chalk.green('🎅'))
    if (tunnelStarted) {
      console.log('Tunnel initialised ' + chalk.green('🎅'))
    }
    console.log(
      chalk.bold('\nAccess URLs:') +
      divider +
      '\nLocalhost: ' + chalk.magenta('http://localhost:' + port) +
      '\n      LAN: ' + chalk.magenta('http://' + ip.address() + ':' + port) +
      (tunnelStarted ? '\n    Proxy: ' + chalk.magenta(tunnelStarted) : '') +
      divider,
      chalk.blue('\nPress ' + chalk.italic('CMD-.') + ' to stop\n')
    )
  },
}

module.exports = logger
