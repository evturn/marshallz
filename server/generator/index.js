import request from 'request'
import { Author } from '../models'
import sentenceGenerator from './sg'

function readRemoteContent(author) {
  const req = request.get(author.content)
  req.on('error', err => console.log(err, '☠️'))
  req.on('response', res => {
    let content = ''
    res.on('data', data => content += data.toString('utf8'))
    req.on('end', _ => {
      const result = sentenceGenerator(content)
      console.log(result)
    })
  })
}

export default _ => {
  Author
    .findOne({ name: 'Marshall' })
    .exec()
    .then(readRemoteContent)
}
