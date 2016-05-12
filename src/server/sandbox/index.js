import { Observable } from 'rx'
import bots from '../bots'
import fs from 'fs'
import { rss as log } from '../../webpack/dev-logger'

const norm = x => x !== undefined ? x.replace(/\.$/ig, '') : '';
const done = x => x.lookup[x.selection] && !(x.state.split(' ').length > 14)

function main() {
  const dictionary$ = Observable.of(bots[0])
    .map(x => fs.readFileSync(x.content).toString())
    .flatMap(createDictionary)

  const initialWord$ = dictionary$.map(selectCapitalizedWord)
  const sentence$ = Observable.combineLatest(dictionary$, initialWord$)
    .map(getInitialState)
    .flatMap(x => Observable.generate(x, done, lookupAndConcat, x => x.state))
    .debounce(1000)
    .subscribe(log.observer)
}

function createDictionary(data) {
  let acc = {}
  data.split(/(?:\. |\n)/ig)
    .forEach(line => {
      line.split(' ')
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
    })
  return Observable.of(acc)
}

function getInitialState([ dictionary, initialWord ]) {
  return {
    lookup: dictionary,
    selection: initialWord,
    state: initialWord
  }
}

function lookupAndConcat({ state, lookup, selection }) {
  let nextState;
  const term = lookup[selection]
  const keys = Object.keys(term)
  const sum = keys.reduce((acc, w) => acc + term[w], 0)
  if (!Number.isFinite(sum)) {
    throw new Error('All values in object must be a numeric value')
  }
  const predicator = ~~(Math.random() * sum)
  keys.forEach(function(x, i) {
    this.count += term[keys[i]]
    if (this.count > predicator && !nextState) {
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

export default main()