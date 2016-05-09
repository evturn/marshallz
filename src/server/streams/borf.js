import { Observable } from 'rx'
import { rss as log } from '../../webpack/dev-logger'

export default x => {
  const dictionary$ = Observable.of(x)
    .map(splitOnLineEndings)
    .map(createDictionary(createHashMap, mapByConsequetiveOccurance))
    .flatMap(spreadAndMergeKeys)

  const initialWord$ = dictionary$
    .map(filterCapitalizedWords)
    .map(selectWordAtRandom)

  Observable.combineLatest(dictionary$, initialWord$)
    .map(getInitialState)
    .flatMap(generateSentence)
    .debounce(1000)
    .subscribe(log.observer)
}

function generateSentence(initialValue) {
  return Observable.generate(
    initialValue,
    chainHasExhausted,
    concatStrings,
    x => x.sentence
  )
}

function getInitialState([dictionary, word]) {
  return { dictionary, word, sentence: word }
}

function concatStrings({ dictionary, word, sentence }) {
  const chain = dictionary[word]
  const keys = Object.keys(chain)
  const sumOfLinksInChain = keys.reduce((acc, x) => acc + chain[x], 0)
  const predicator = ~~(Math.random() * sumOfLinksInChain)

  const x = keys.reduce((acc, x, i, src) => {
    acc.count += chain[src[i]]
    if (acc.count > predicator) {
      acc.value = {
        dictionary,
        word: src[i],
        sentence: `${sentence} ${src[i]}`
      }
    }
    return acc
  }, { count: 0, value: {} })
  return x.value
}

function createDictionary(aggregator, transform) {
  return x => x.map(aggregator(transform))
}

function createHashMap(reducer) {
  return string => {
    return string
    .split(' ')
    .filter(isNotEmpty)
    .reduce(reducer, {})
  }
}

function mapByConsequetiveOccurance(acc, x, i, src) {
  const curr = norm(src[i])
  const next = norm(src[i + 1])
  if (!acc[curr]) { acc[curr] = {} }
  acc[curr][next] = !acc[curr][next] ? 1 : acc[curr][next] + 1
  return acc
}

function chainHasExhausted(x) {
  return x.dictionary[x.word] && !(x.sentence.length > 120)
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
  return x !== undefined ? x.replace(/\.$|\["'()]/ig, '') : ''
}

function isNotEmpty(x) {
  return x.trim() !== ''
}