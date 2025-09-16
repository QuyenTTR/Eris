import express from 'express';

import categoryController from '../../../controllers/CategoryController.js';

const router = express.Router();

router.get('/getAll', categoryController.getAll);
router.post('/create', categoryController.store);
// router.put('/update/:id', categoryController.updateId);
router.put('/updateStatus/:id', categoryController.changeStatusId);
router.delete('/delete/:id', categoryController.destroyId);

export default router;
