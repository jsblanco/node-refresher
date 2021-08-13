import express from 'express';
import * as adminController from '../controllers/admin';

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.get('/products', adminController.getProducts);
router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/add-product', adminController.postUpdateProducts);
router.post('/edit-product', adminController.postUpdateProducts);
router.post('/delete-product', adminController.postDeleteProduct);

export default router;
