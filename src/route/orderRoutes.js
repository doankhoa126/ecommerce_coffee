import express from 'express';
import { getCart } from '../controller/orderController.js';

const router = express.Router();

router.post('/shopping-cart', getCart)

export default router;