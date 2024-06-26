import { getShoppingCart } from "../models/orderModel.js";

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