import express from 'express';

import accountController from '../../../controllers/AccountController.js';

const router = express.Router();

router.get('/getAll', accountController.getAll);
// router.post('/create', accountController.store);
// router.put('/update/:id', accountController.updateId);
// router.put('/updateStatus/:id', accountController.changeStatusId);
// router.delete('/delete/:id', accountController.destroyId);

export default router;
