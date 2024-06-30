import axios from "axios";

const API_BASE_URL = 'http://192.168.1.27:3000/api';

export const fetchProducts = async (page, perPage) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/getAllProducts`, {
            params: { page, perPage }
        });
        if (response.data.message === "Product found" && Array.isArray(response.data.products)) {
            return {
                products: response.data.products,
                totalProducts: response.data.total_product || 0
            };
        } else {
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        throw error;
    }
};

export const fetchProductDetails = async (productId) => {
    try{
        const response = await axios.get(`${API_BASE_URL}/products/getProductDetails/${productId}`);
        if (response.data.message === "Product found" && response.data.product.length > 0) {
            return response.data.product[0];
        } else {
            throw new Error('Unexpected response format');
        }
    }catch (error) {
        throw error;
    }
};