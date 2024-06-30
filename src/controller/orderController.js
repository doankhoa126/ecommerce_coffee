import { addProductToCartItems, checkProductBeforeAdd, getAllProductInShoppingCart, updateProduct } from "../models/orderModel.js";
import { getProductById } from "../models/productModel.js";

// get shopping cart
export const getShoppingCart = async (req, res) => {
    const userID = 16
    const userIDs = req.cookies.userID;
    console.log(userID + " " + userIDs)

    if (!userID) return res.status(403).json({ message: "userID is required" })

    try {
        const carts = await getAllProductInShoppingCart(userID);
        console.log(carts)
        if (carts.length === 0) {
            return res.status(404).json({ message: "No cart found" })
        }
        return res.status(200).json({ message: "Cart found", carts: carts })
    } catch (error) {
        res.status(500).json({ message: "Error getting shopping cart", error });
    }

}

// add product to shopping cart
export const createNewProductToCartItems = async (req, res) => {
    try {
        const { quantity, price, productID, shoppingCartID } = req.body;

        const productExists = await checkProductBeforeAdd(productID, shoppingCartID)
        const getNameProduct = await getProductById(productID)

        const getData = productExists[0]
        const dataNameProduct = getNameProduct[0]

        if (productExists.length > 0) {
            console.log("Product already exists")
            const newQuantity = getData.quantity + quantity
            const newPrice = getData.price + price*quantity
            

            console.log(newQuantity, newPrice)

            const data = {
                quantity: newQuantity,
                price: newPrice,
            }

            const updatedQuantity = await updateProduct(data, productID, shoppingCartID)

            if (updatedQuantity) {
                return res.status(200).json({ message: "Product updated successfully", newProduct: updatedQuantity })
            }
        } else {
            const data = {
                name: dataNameProduct.name,
                quantity: quantity,
                price: price * quantity,
                product_id: productID,
                shopping_cart_id: shoppingCartID
            }

            const productInCartItems = await addProductToCartItems(data)
            if (productInCartItems) {
                return res.status(200).json({ message: "Product added successfully", newProduct: productInCartItems })
            }
        }


    } catch (error) {
        console.log("Error adding product to shopping cart" + error.message)
    }
}