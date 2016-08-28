import Generator from './sg'

export default function blog(author, content) {
  const createSentence = Generator(content)

  function write(acc) {
    acc.push(createSentence())
    if (acc.length < 4) {
      write(acc)
    }

    return acc.join('. ')
  }

  const result = {
    title: createSentence(),
    body: write([]),
  }

  console.log(result)
  return result
}
