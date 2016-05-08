import { Observer } from 'rx'

export const cron = {
  observer: Observer.create(
    x => console.log(`〰️〰️〰️〰️〰️〰️〰️${x}`),
    e => console.log(e),
    _ => console.log(`\n\x1b[37m〰️〰️〰️〰️〰️〰️〰️ Stream running 〰️〰️〰️〰️〰️〰️〰️️\n`)
  ),
  blog: x => ` \x1b[37m Blog   \x1b[31m -> \x1b[32m ${x.name}`,
  twitter: x => `\x1b[37m Twitter \x1b[31m -> \x1b[32m ${x.name}`
}

export const blog = {
  observer: Observer.create(
    x => console.log(`\n\x1b[37m〰️〰️〰️〰️〰️〰️〰️ ${x.author.username} posted. 〰️〰️〰️〰️〰️〰️〰️️\n`),
    e => console.log('Errors, they happen.', e),
    _ => console.log(`Blog doesn't complete`)
  )
}

export const twitter = {
  observer: Observer.create(
    x => console.log(`\n\x1b[37m〰️〰️〰️〰️〰️〰️〰️ Someone tweeted '${x.text}' 〰️〰️〰️〰️〰️〰️〰️️\n`),
    e => console.log('Errors, they happen.', e),
    _ => console.log('we complete.')
  )
}