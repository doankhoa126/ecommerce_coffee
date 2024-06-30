import express from 'express';
import { createNewProductToCartItems, getShoppingCart } from '../controller/orderController.js';

const router = express.Router();

router.post('/shopping-cart', getShoppingCart)
router.post('/addProductToCartItems', createNewProductToCartItems)

export default router;