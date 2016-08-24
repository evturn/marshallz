import request from 'request'

function readRemoteContent(author) {
  const req = request.get(author.content)
  req.on('error', err => console.log(err, '☠️'))
  req.on('response', res => {
    let content = ''
    res.on('data', data => content += data.toString('utf8'))
    req.on('end', _ => console.log(content))
  })
}
