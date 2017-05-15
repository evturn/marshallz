import express from 'express';
import path from 'path';
import startGenerator from './generator';

startGenerator();

const app = express();
app.use(express.static(path.join(process.cwd(), 'build')));
app.get('*', (req, res) => res.send('index.html'));
app.listen(3000, () => console.log('Running'));