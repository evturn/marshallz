import { Observable } from 'rx'
import { rss as log } from '../../webpack/dev-logger'

function createDictionary(x) {
  return x
    .split(' ')
    .filter(isNotEmpty)
    .reduce((acc, x, i, src) => {
      const curr = norm(src[i])
      const next = norm(src[i + 1])
      if (!acc[curr]) { acc[curr] = {} }
      acc[curr][next] = !acc[curr][next] ? 1 : acc[curr][next] + 1
      return acc
    }, {})
}

export default x => {
  const dictionary$ = Observable.of(x)
    .map(splitOnLineEndings)
    .map(x => x.map(createDictionary))
    .flatMap(spreadAndMergeKeys)

  const initialWord$ = dictionary$
    .map(filterCapitalizedWords)
    .map(selectWordAtRandom)

  Observable.combineLatest(dictionary$, initialWord$)
    .map(getInitialState)
    .flatMap(generateSentence)
    .debounce(1000)
    .repeat(5)
    .subscribe(log.observer)
}

function generateSentence(initialValue) {
  return Observable.generate(
    initialValue,
    chainHasExhausted,
    iterateToNextChain(reduceNextString, mergeStateAndPredictor),
    x => x.sentence
  )
}

function getInitialState([ dictionary, word ]) {
  return {
    dictionary,
    word,
    sentence: word,
    hash: dictionary[word]
  }
}

function iterateToNextChain(reducer, accumulator) {
  return state => {
    const x = accumulator(state)
    const { value } = x.keys.reduce(reducer, x.acc)
    return value
  }
}

function mergeStateAndPredictor(state) {
  const { keys, predicator } = enumPropsFromHash(state.hash)
  return Object.assign({}, { keys }, {
    acc: {
      count: 0,
      value: {},
      predicator,
      ...state
    }
  })
}

function reduceNextString(acc, x, i, src)  {
  acc.count += acc.hash[src[i]]
  if (acc.count > acc.predicator) {
    acc.value = {
      dictionary: acc.dictionary,
      word: src[i],
      sentence: `${acc.sentence} ${src[i]}`,
      hash: acc.dictionary[src[i]]
    }
  }
  return acc
}

function enumPropsFromHash(hash) {
  const keys = Object.keys(hash)
  const predicator = ~~(Math.random() * keys.reduce((acc, x) => acc + hash[x], 0))
  return { predicator, keys }
}

function chainHasExhausted(x) {
  return x.dictionary[x.word] && !(x.sentence.length > 120)
}

function splitOnLineEndings(x) {
  return x.split(/(?:\. $|\n)/ig)
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
  return x !== undefined ? x.replace(/\(|\)|\|\"|\'\.$/ig, '') : ''
}

function isNotEmpty(x) {
  return x.trim() !== ''
}