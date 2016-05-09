import { Observable } from 'rx'
import { rss as log } from '../../webpack/dev-logger'

export default x => {
  const tree$ = Observable.of(x)
    .map(splitOnLineEndings)
    .map(x => {
      return x.map(string => {
        return string
          .split(' ')
          .filter(isNotEmpty)
          .reduce(createHashMap, {})
      })
    })
    .flatMap(spreadAndMergeKeys)

  const initialWord$ = tree$
    .map(filterCapitalizedWords)
    .map(selectWordAtRandom)

  Observable.combineLatest(tree$, initialWord$)
    .flatMap(([tree, word]) => {
      return Observable.generate(
        { tree, word, sentence: word },
        chainExhausted,
        concatStrings,
        x => x.sentence
      )
      .debounce(1000)
    })
    .subscribe(log.observer)
}

function concatStrings(x) {
  let { tree, word, sentence } = x
  const chain = tree[word]
  const keys = Object.keys(chain)
  const sumOfLinksInChain = keys.reduce((acc, x) => acc + chain[x], 0)
  const predicator = ~~(Math.random() * sumOfLinksInChain)

  keys.forEach(function(_, i) {
    this.count += chain[keys[i]]
    if (this.count > predicator) {
      x = {
        tree,
        word: keys[i],
        sentence: `${sentence} ${keys[i]}`
      }
    }
  }, { count: 0 })
  return x
}

function createHashMap(acc, x, i, src) {
  const curr = norm(src[i])
  const next = norm(src[i + 1])

  if (!acc[curr]) {
    acc[curr] = {}
  }
  if (!acc[curr][next]) {
    acc[curr][next] = 1
  } else {
    acc[curr][next] += 1
  }
  return acc
}

function chainExhausted(x) {
  return x.tree[x.word] && !(x.sentence.length > 120)
}

function splitOnLineEndings(x) {
  return x.json.split(/(?:\. |\n)/ig)
}

function spreadAndMergeKeys(x) {
  return Observable.from(x)
    .reduce((acc, x) => Object.assign(acc, { ...x }), {})
}

function filterCapitalizedWords(x) {
  return Object.keys(x).filter(x => x[0] >= 'A' && x[0] <= 'Z')
}

function selectWordAtRandom(x) {
  return x[~~(Math.random() * x.length)]
}

function norm(x) {
  return x !== undefined ? x.replace(/\.$/ig, '') : ''
}

function isNotEmpty(x) {
  return x.trim() !== ''
}