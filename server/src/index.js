import express from 'express';
import morgan from 'morgan';
import cors from 'cors'

import route from './routes/index.js';
import db from './config/db/index.js';

db.connect();

const app = express()
const port = 3000;

app.use(morgan('combined'));
app.use(cors());

route(app);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/`)
})
