import express from 'express';
import { getProducts, getProductDetails } from '../controller/product.js';

const router = express.Router();

router.get('/getAllProducts', getProducts)
router.get('/getProductDetails/:id', getProductDetails)

export default router;