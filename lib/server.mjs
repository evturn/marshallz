import express from 'express';
import path from 'path';
import runJobs from './api';

runJobs();

const app = express();

app.use(express.static(path.join(process.cwd(), 'build')));
app.get('*', (req, res) => res.send('index.html'));
app.listen(3000, () => console.log('Running'));
