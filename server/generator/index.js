import request from 'request'
import { Author } from '../models'
import sentenceGenerator from './sg'

function readStream(content) {
  const result = sentenceGenerator(content)
  console.log(result)
}

function fetchRemoteContent(url, fn) {
  const req = request.get(url)
  req.on('error', err => console.log(err, '☠️'))
  req.on('response', res => {
    let content = ''
    res.on('data', data => content += data.toString('utf8'))
    req.on('end', _ => fn(content))
  })
}

export default _ => {
  Author
    .findOne({ name: 'Marshall' })
    .exec()
    .then(author => author.content)
    .then(url => fetchRemoteContent(url, readStream))
}
