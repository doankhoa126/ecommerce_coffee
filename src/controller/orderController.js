import { checkProductBeforeAdd, getShoppingCart, updateProduct } from "../models/orderModel.js";

// get shopping cart
export const getCart = async (req, res) => {
    // const userID = req.body.userID
    const userID = 19
    const userIDs = req.cookies.userID;
    console.log(userID + " " + userIDs)

    if (!userID) return res.status(403).json({ message: "userID is required" })

    try {
        const carts = await getShoppingCart(userID);
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
export const addProductToShoppingCart = async (req, res) => {
    try {
        const { quantity, price, productID, shoppingCartID } = req.body;

        const productExists = await checkProductBeforeAdd(productID, shoppingCartID)
        if (productExists) {
            console.log("Product already exists")
            const newQuantity = productExists.quantity + 1

            const updatedQuantity = await updateProduct(newQuantity, productID, shoppingCartID)

            if(updatedQuantity){
                return res.status(200).json({message:"Product updated successfully", newProduct: updateProduct})
            }
            return res.status(200).json({ message: "Product already exists in the cart" })
        }
    } catch (error) {
        console.log("Error adding product to shopping cart" + error.message)
    }
}