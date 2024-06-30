import axios from "axios";

const API_BASE_URL ="http://192.168.1.27:3000/api"

export const fetchShoppingCart = async (idCard) =>{
    try{
        const response = await axios.post(`${API_BASE_URL}/order/shopping-cart/11`)
        if (response.data.message === "Cart found") {
            return response.data;
        } else {
            throw new Error('Unexpected response format');
        }
    }catch (error) {
        throw error;
    }
};

export const addProductToCart = async (productId, idCard) => {
    try{
        const response = await axios.post(`${API_BASE_URL}/order/addProductToCartItems`, {productId, idCard})
        if (response.data.message === "Product added successfully") {
            return response.data;
        } else {
            throw new Error('Unexpected response format');
        }
    }catch (error){
        throw error;
    }
}