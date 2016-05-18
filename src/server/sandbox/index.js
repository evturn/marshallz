import express from 'express'
import path from 'path'
import main from './generator'
import devServer from '../../webpack/dev-server'

const app = express()

devServer(app)

app.use(express.static(__dirname + '/ui/dist'));

app.post('/api', (req, res, next) => {
  console.log(req.body)
  res.json(main(req.body))
})

app.get('*', (req, res, next) => {
  res.send('index.html')
})

app.listen(3001, _ => console.log('Sandboxing'))