import supabase from '../config/connectDB.js'

export async function getShoppingCart(userID) {
    try {
        const { data: cart, err } = await supabase
            .from("shopping_cart")
            .select() 
            .eq("user_id", userID);

        if (err) {
            throw error;
        }

        if(cart.length === 0){
            throw new Error("No find shopping cart")
        }

        const cartID = cart[0].cart_id
        console.log(cartID)

        const { data: cartItems, error } = await supabase
           .from("cart_items")
           .select()
           .eq("cart_id", cartID)
        if(error){
            throw error
        }
        if(cartItems.length === 0){
            throw new Error("No find product in shopping cart")
        }

        // Lấy thông tin chi tiết của các sản phẩm từ bảng product
        const productIDs = cartItems.map(item => item.product_id);
        const { data: products, error: productsError } = await supabase
            .from("product")
            .select()
            .in("id", productIDs); // Lọc bởi các product_id đã lấy được từ cart_items

        if (productsError) {
            throw productsError;
        }
        console.log(products)
        return products;
    } catch (error) {
        console.error("Error find product in shopping cart", error)
        throw error;
    }
}