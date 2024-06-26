import express from 'express';
import { getProducts, getProductDetails } from '../controller/productController.js';

const router = express.Router();

router.get('/getAllProducts', getProducts)
router.get('/getProductDetails/:id', getProductDetails)

export default router;