import { Observer } from 'rx'

const R = `\x1b[31m`
const B = `\x1b[34m`
const G = `\x1b[32m`
const W = `\x1b[37m`
const C = `\x1b[36m`
const r = `\x1b[0m`

export const cron = {
  observer: Observer.create(
    x => console.log(`〰️〰️〰️〰️〰️〰️〰️${x}`),
    e => console.log(er('Cronjob', e)),
    _ => console.log(xl('Stream running'))
  ),
  blog: x => ` ${W} Blog   ${R} -> ${G} ${x.name}`,
  twitter: x => `${W} Twitter ${R} -> ${G} ${x.name}`
}

export const blog = {
  observer: Observer.create(
    x => console.log(xl(`${x.author.username} posted.`)),
    e => console.log(er('Blog', e)),
    _ => console.log(`Blog doesn't complete`)
  )
}

export const twitter = {
  observer: Observer.create(
    x => console.log(xl(`Someone tweeted '${x.text}'`)),
    e => console.log(er('Twitter', e)),
    _ => console.log(`Twitter connection closed.`)
  )
}

export const rss = {
  observer: Observer.create(
    x => console.log(to(`    🐓    `, `\n${x}\n`)),
    e => console.log(er('RSS', e)),
    _ => console.log(`RSS transform stream ended.`)
  )
}


export const server = _ => {
  console.log(to(`    🌐    `, process.env.NODE_ENV.toUpperCase()))
  console.log(to(`    ️💻    `, process.env.PORT_MARSHALLZ))
}

export const db = {
  open: _ => console.log(xl('DB connected')),
  error: console.error.bind(console, er('Connection error:'))
}


function xl(x) {
  return `\n${W}〰️〰️〰️〰️〰️〰️〰️ ${x} 〰️〰️〰️〰️〰️〰️〰️️\n${r}`
}

function er(x, e) {
  return `${R} ${x} errors, they happen.\n${e}`
}

function to(x, z) {
  return `${W}〰️〰️〰️〰️〰️〰️〰️${x}->  ${C} ${z}${r}`
}
