const c = require('chalk')
const fs = require('fs')
const path = require('path')
const request = require('request')
const mkdirp = require('mkdirp')
const rimraf = require('rimraf')
const { Observable } = require('rxjs')
const { assets, dirs, seeds } = require('../manifest.json')

dirs.remove.map(rimraf.sync)
dirs.make.map(x => mkdirp(x))

Observable.from(assets.concat(seeds))
  .map(createPaths)
  .flatMap(fetchAssets())
  .subscribe(
    createProgressBar(),
    e => console.log(c.bgRed(e))
  )

function createPaths(data) {
  return {
    dest: path.resolve(process.cwd(), dirs.output) + `/${data.file}.${data.format}`,
    url: data.url
  }
}

function fetchAssets() {
  return ({ url, dest }) => {
    return Observable.create(observer => {
      request
        .get(url)
        .on('error', e => observer.error(e))
        .on('response', response => {
          response.pipe(fs.createWriteStream(dest))
          response.on('end', _ => observer.next(true))
        })
    })
  }
}

function createProgressBar() {
  let i = 0
  let __ = ' '
  const inc = _ => __ += ' '
  const dec = _ => __ = __.substr(0, (__.length - 1) - 1)
  let direction = inc
  return _ => {
    const bars = [
      `${c.red.bgRed(__)}`,
      `${c.yellow.bgYellow(__)}`,
      `${c.green.bgGreen(__)}`,
      `${c.cyan.bgCyan(__)}`,
      `${c.magenta.bgMagenta(__)}`,
      `${c.blue.bgBlue(__)}`,
      `${c.red.bgRed(__)}`,
      `${c.yellow.bgYellow(__)}`,
      `${c.green.bgGreen(__)}`,
      `${c.cyan.bgCyan(__)}`,
      `${c.magenta.bgMagenta(__)}`,
      `${c.blue.bgBlue(__)}`,
    ]
    console.log(bars[i])
    i = i === bars.length - 1 ? 0 : i + 1
    if (__.length === 50) {
      direction = dec
    } else if (__.length === 1) {
      direction = inc
    }
    direction()
  }
}
