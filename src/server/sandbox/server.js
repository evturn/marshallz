import express from 'express'
import path from 'path'
import devServer from '../../webpack/dev-server'

const app = express()

devServer(app)

app.use(express.static(__dirname + '/ui/dist'));
app.get('*', (req, res, next) => {
  res.send('index.html')
})

app.listen(3001, _ => console.log('Sandboxing'))