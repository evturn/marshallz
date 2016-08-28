import request from 'request'
import { Author } from '../models'
import blog from './blog'

export default action => {
  const requestFn = fetchData(readStream(action))
  const getData = findAuthor(requestFn)
  const result = getData(action)
}

function fetchData(readFn) {
  return author => {
    let content = ''
    const req = request.get(author.content)
    req.on('error', err => console.log(err, '☠️'))
    req.on('response', res => {
      res.on('data', data => content += data.toString('utf8'))
      req.on('end', _ => {
        readFn(content)
      })
    })
  }
}

function findAuthor(requestFn) {
  return action => {
    Author
    .findById(action._id)
    .exec()
    .then(requestFn)
  }
}

function readStream(action) {
  return content => {
    return blog(action._id, content)
  }
}
