import request from 'request'
import { Author } from '../models'

function readRemoteContent(author) {
  const req = request.get(author.content)
  req.on('error', err => console.log(err, '☠️'))
  req.on('response', res => {
    let content = ''
    res.on('data', data => content += data.toString('utf8'))
    req.on('end', _ => {
      const tree = mapWordsByWeight(content)
      console.log(tree)
    })
  })
}

function mapWordsByWeight(str) {
  return str
    .split(/(?:\.|\?|\n)/ig)
    .map(x => {
      return x
        .split(' ')
        .filter(x => x.trim() !== '')
        .map(x => x.replace(/\.$/ig, ''))
    })
    .filter(x => x.length)
    .reduce((acc, line) => {
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

function getStartingPoint(tree) {
  const caps = Object.keys(tree).filter(x => x[0] >= 'A' && x[0] <= 'Z')
  return caps[~~(Math.random() * caps.length)]
}

function selectFollowingWord(obj) {
  const keys = Object.keys(obj);
  const sum = keys.reduce((p, c) => p + obj[c], 0);

  if (!Number.isFinite(sum)) {
    throw new Error('All values in object must be a numeric value');
  }

  const select = ~~(Math.random() * sum);

  for (let i = 0, count = 0; i < keys.length; i++) {
    count += obj[keys[i]];
    if (count > select) {
      return keys[i];
    }
  }
}

export default _ => {
  Author
    .findOne({ name: 'Marshall' })
    .exec()
    .then(readRemoteContent)
}
