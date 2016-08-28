export default function sentenceGenerator(content) {
  const linesArr = eachLineToArrayOfWords(content)
  const tree = mapWordsByAppearance(linesArr)
  return blog(tree, linesArr)
}

function blog(tree, linesArr) {
  function write(acc) {
    acc.push(createSentence(tree, linesArr))
    if (acc.length < 4) {
      write(acc)
    }

    return acc.join('. ')
  }

  return {
    title: createSentence(tree, linesArr),
    body: write([]),
  }
}


function eachLineToArrayOfWords(str) {
  return str
    .split(/(?:\.|\?|\n)/ig)
    .map(x => {
      return x
        .split(' ')
        .filter(x => x.trim() !== '')
        .map(x => x.replace(/\.$/ig, ''))
    })
    .filter(x => x.length)
}

function mapWordsByAppearance(lines) {
  return lines.reduce((acc, line) => {
    line
      .map((x, i) => ({ curr: x, next: line[i + 1] }))
      .filter(x => x.next)
      .map(x => {
        if (!acc[x.curr]) {
          acc[x.curr] = {}
        }
        if (!acc[x.curr][x.next]) {
          acc[x.curr][x.next] = 1
        } else {
          acc[x.curr][x.next] += 1
        }
      })
    return acc
  }, {})
}

function createSentence(tree, linesArr) {
  function write(acc, word) {
    if (tree[word] && acc.length < 16) {
      const nextWord = selectNext(tree[word])
      acc.push(nextWord)
      write(acc, nextWord)
    }
    return acc.join(' ')
  }

  const startWords = linesArr.map(x => x[0])
  const start = startWords[Math.floor(startWords.length * Math.random())]
  return write([ start ], start)
}


function selectNext(obj) {
  const keys = Object.keys(obj)
  const num = ~~(Math.random() * keys.reduce((acc, x) => acc + obj[x], 0))

  const { word } = keys.reduce((acc, x) => {
    if (!acc.word) {
      acc.i += obj[x]
      if (acc.i > num) {
        acc.word = x
      }
    }

    return acc
  }, { i: 0 })

  return word
}
