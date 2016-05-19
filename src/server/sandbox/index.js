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
  const { bot, job, src } = req.body

  main(req.body).subscribe(x => (
    res.json({
      name: bot.displayName,
      job: job.icon,
      date: Date.now(),
      result: x
    }))
  )
})

app.get('*', (req, res, next) => {
  res.send('index.html')
})

app.listen(3001, _ => console.log('Sandboxing'))