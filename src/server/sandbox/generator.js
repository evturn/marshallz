import { Observable } from 'rx'
import bots from '../bots'
import fs from 'fs'
import RSS from '../streams/rss'
import { rss as log } from '../../webpack/dev-logger'

const readFromArchive = selection => {
  return Observable.from(bots)
    .filter(bot => bot.username === selection.bot.username)
    .map(x => fs.readFileSync(x.file).toString())
    .map(x => x.split(/(?:\. |\n)/ig))
}

const readFromRSSFeed = selection => {
  return Observable.from(bots)
    .filter(bot => bot.username === selection.bot.username)
    .flatMap(RSS)
    .map(x => x.description)
    .map(x => x.split(/(?:\. |\n)/ig))
}

export default selection => {
  return Observable.of(selection)
    .flatMap(selection => {
      let readFromSrc

      if (selection.src.name === 'Archive') {
        readFromSrc = readFromArchive
      } else if (selection.src.name === 'RSS') {
        readFromSrc = readFromRSSFeed
      }

      const dictionary$ = readFromSrc(selection)
        .flatMap(createDictionary)

      const initialWord$ = dictionary$.map(selectCapitalizedWord)

      return Observable.combineLatest(dictionary$, initialWord$)
        .flatMap(generateSentence)
        .debounce(1000)
    })
}

function createDictionary(data) {
  const hashmap = data.reduce((acc, x) => {
    x.split(' ')
      .filter(word => word.trim() !== '')
      .map((x, i, arr) => {
        const curr = norm(arr[i])
        const next = norm(arr[i + 1])
        if (!acc[curr]) {
          acc[curr] = {}
        }
        if (!acc[curr][next]) {
          acc[curr][next] = 1
        } else {
          acc[curr][next] += 1
        }
      })

      return acc
  }, {})

  return Observable.of(hashmap)
}

function generateSentence([ dictionary, initialWord ]) {
  return Observable.generate(
    {
      lookup: dictionary,
      selection: initialWord,
      state: initialWord
    },
    x => x.lookup[x.selection] && !(x.state.split(' ').length > 14),
    lookupAndConcat,
    x => x.state
  )
}

function lookupAndConcat({ state, lookup, selection }) {
  const term = lookup[selection]
  const keys = Object.keys(term)
  const sum = keys.reduce((acc, w) => acc + term[w], 0)

  if (!Number.isFinite(sum)) {
    throw new Error('All values in object must be a numeric value')
  }

  let nextState;

  keys.forEach(function(x, i) {
    this.count += term[keys[i]]
    if (!nextState && this.count > ~~(Math.random() * sum)) {
      nextState = {
        lookup,
        selection: keys[i],
        state: state + ' ' + keys[i]
      }
    }
  }, { count: 0 })

  return nextState
}

function selectCapitalizedWord(x) {
  const caps = Object.keys(x).filter(([ x ]) => x >= 'A' && x <= 'Z')
  return caps[~~(Math.random() * caps.length)]
}

function norm(x) {
  return x !== undefined ? x.replace(/\.$/ig, '') : ''
}