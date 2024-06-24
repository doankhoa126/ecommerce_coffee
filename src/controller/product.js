import { getAllProducts, getProductById } from "../models/product.js"

export const getProducts = async (req, res) => {
    try {
        const products = await getAllProducts();
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        return res.status(200).json({ message: "Product found", products: products });
    } catch (error) {
        res.status(500).json({ message: "Error getting products", error });
    }
}

export const getProductDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getProductById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({ message: "Product found", product: product });
    } catch (error) {
        res.status(500).json({ message: "Error getting product", error });
    }
}