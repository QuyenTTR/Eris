import express from 'express';
import upload from '../../../middlewares/multer.js';

import itemController from '../../../controllers/ItemController.js';

const router = express.Router();

router.get('/getAll', itemController.getAll);
router.post('/create', upload.single('image'), itemController.store);
router.put('/update/:id', upload.single('image'), itemController.updateId);
router.put('/updateStatus/:id', itemController.changeStatusId);
router.delete('/delete/:id', itemController.destroyId);

export default router;
