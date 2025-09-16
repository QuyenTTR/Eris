import apiRouter from './api/index.js';

function route(app) {
  app.use('/api', apiRouter);
}

export default route;
