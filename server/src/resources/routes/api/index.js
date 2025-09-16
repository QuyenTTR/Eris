import express from 'express';

import itemRouter from './item/index.js';
import categoryRouter from './category/index.js';
import accountRouter from './account/index.js';

const router = express.Router();

router.use('/item', itemRouter);
router.use('/category', categoryRouter);
router.use('/account', accountRouter);

export default router;
