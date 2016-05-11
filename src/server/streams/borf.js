import { Observable } from 'rx'
import { rss as log } from '../../webpack/dev-logger'

let j = 0
const d = x => console.log(`============START=============\n\n\n${x}\n\n\n==============END=============\n\n${j += 1}\n\n`)

let i = 0
const c = x => console.log(`Value:\n${x}\n \nType:\n${typeof x}\n \nIndex:\n${i += 1}\n\n`)

export default x => {
  const dictionary$ = Observable.from([x])
    .map(x => x.title)
    .reduce((acc, x) => {
      c(x)
      return `${acc + x} `
    }, '')
    .flatMap(spreadAndMergeKeys)

  const initialWord$ = dictionary$
    .map(filterCapitalizedWords)
    .map(selectWordAtRandom)

  return Observable.combineLatest(dictionary$, initialWord$)
    .map(getInitialState)
    .flatMap(generateSentence)
    .debounce(1000)
}

function createDictionary(x) {
  const dictionary =  x
    .split(' ')
    .filter(isNotEmpty)
    .reduce((acc, x, i, src) => {
      const curr = norm(src[i])
      const next = norm(src[i + 1])
      if (!acc[curr]) { acc[curr] = {} }
      acc[curr][next] = !acc[curr][next] ? 1 : acc[curr][next] + 1
      return acc
    }, {})

  return [ dictionary ]
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