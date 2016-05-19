import express from 'express'
import path from 'path'
import main from './generator'
import devServer from '../../webpack/dev-server'
import bodyParser from 'body-parser'

const app = express()

devServer(app)

app.use(express.static(__dirname + '/ui/dist'));
app.use(bodyParser.json())

app.post('/api', (req, res, next) => {
  main(req.body).subscribe(x => res.json({ sentence: x }))
})

app.get('*', (req, res, next) => {
  res.send('index.html')
})

app.listen(3001, _ => console.log('Sandboxing'))