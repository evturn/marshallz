import Generator from './sg'

export default function createGeneratorInstance(data) {
  return createInstance(createInteralGenerator(data))
}

function createInteralGenerator(data) {
  return Generator(data)
}

function createInstance(fn) {
  const gen = {
    value: '',
    run() {
      return fn()
    },
    take(x) {
      gen.clear()
      Array.from({length: x}, (_, i) => i + 1).map(gen.concat)
      return gen.unwrap()
    },
    generate: _ => {
      gen.concat()
      return gen.unwrap()
    },
    unwrap() {
      return gen.value.trim()
    },
    concat() {
      gen.value += `${gen.run()}. `
    },
    clear() {
      gen.value = ''
    },
  }
  return gen
}