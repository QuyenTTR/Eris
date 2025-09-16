import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import route from './resources/routes/index.js';
import db from './resources/config/db/index.js';

db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use(morgan('combined'));
app.use(express.json());
app.use(cors());

route(app);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
