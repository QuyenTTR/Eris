import express from 'express';

import itemController from '../../../controllers/ItemController/index.js';

const router = express.Router();

router.get('/getAll', itemController.getAll);
router.post('/create', itemController.store);
router.put('/updateStatus/:id', itemController.changeStatusId);
router.put('/update/:id', itemController.updateId);
router.delete('/delete/:id', itemController.destroyId);

export default router;