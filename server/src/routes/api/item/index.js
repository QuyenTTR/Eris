import express from 'express';

import itemController from '../../../controllers/ItemController/index.js';

const router = express.Router();

router.get('/getAll', itemController.getAll);

export default router;