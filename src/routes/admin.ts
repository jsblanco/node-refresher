import express from 'express';
import * as adminController from '../controllers/admin';

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/products', adminController.getProducts);

export default router;
