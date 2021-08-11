import express from 'express';
import * as productsController from '../controllers/shop';

const router = express.Router();

router.get('/', productsController.getIndex);
router.get('/cart', productsController.getCart);
router.get('/orders', productsController.getOrders);
router.get('/products', productsController.getAllProducts);
router.get('/checkout', productsController.getCheckout);

export default router;