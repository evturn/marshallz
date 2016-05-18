import { Observable } from 'rx'
import bots from '../bots'
import fs from 'fs'
import { rss as log } from '../../webpack/dev-logger'

export default selection => {
  const dictionary$ = Observable.from(bots)
    .filter(x => x.username === selection.bot.username)
    .map(x => fs.readFileSync(x.file).toString())
    .map(x => x.split(/(?:\. |\n)/ig))
    .flatMap(createDictionary)

  const initialWord$ = dictionary$.map(selectCapitalizedWord)
  const sentence$ = Observable.combineLatest(dictionary$, initialWord$)
    .flatMap(generateSentence)
    .debounce(1000)
    .subscribe(log.observer)
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