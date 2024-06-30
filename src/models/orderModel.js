import supabase from '../config/connectDB.js'

// load data into shoppping cart
export async function getAllProductInShoppingCart(userID) {
    try {
        // const { data: shopping_cart, err } = await supabase
        //     .from("shopping_cart")
        //     .select()
        //     .eq("user_id", userID);

        // if (err) {
        //     throw error;
        // }

        // if (shopping_cart.length === 0) {
        //     throw new Error("No find shopping cart")
        // }
        // console.log(shopping_cart)

        // const cartID = shopping_cart[0].id
        // console.log(cartID)

        // const { data: cartItems, error } = await supabase
        //     .from("cart_items")
        //     .select()
        //     .eq("shopping_cart_id", cartID)
        // if (error) {
        //     throw error
        // }
        // if (cartItems.length === 0) {
        //     throw new Error("No find product in shopping cart")
        // }

        // // Lấy thông tin chi tiết của các sản phẩm từ bảng product
        // const productIDs = cartItems.map(item => item.product_id);
        // const { data: products, error: productsError } = await supabase
        //     .from("product")
        //     .select()
        //     .in("id", productIDs); // Lọc bởi các product_id đã lấy được từ cart_items

        // if (productsError) {
        //     throw productsError;
        // }
        // console.log(products)
        // return products;
        const { data, error } = await supabase
            .from("cart_items")
            .select("name, quantity, price")

            if(error){
                throw error;
            }

            return data
    } catch (error) {
        console.error("Error find product in shopping cart", error)
        throw error;
    }
}

// check product before adding to shopping cart

export async function checkProductBeforeAdd(productID, shoppingCartID) {
    try {
        const { data, error } = await supabase
            .from("cart_items")
            .select()
            .eq("shopping_cart_id", shoppingCartID)
            .eq("product_id", productID)

        if (error) {
            throw error
        }

        return data
    } catch (error) {
        console.error("Error check product before add to shopping cart", error)
        throw error;
    }
}

// add products to cart_items
export async function addProductToCartItems(data) {
    try {
        const { data: cart_items, error: errAddCart } = await supabase
            .from("cart_items")
            .insert([data])
            .select()

        if (errAddCart) {
            throw errAddCart
        }

        return cart_items
    } catch (error) {
        console.error("Error add product to shopping cart", error)
        throw error;
    }
}

// update quantity of product in cart_items
export async function updateProduct(newdata, productID, shoppingCartID) {
    try {
        const { data, error } = await supabase
            .from("cart_items")
            .update([newdata])
            .eq("product_id", productID)
            .eq("shopping_cart_id", shoppingCartID)
            .select()

        if (error) {
            throw error
        }

        return data
    } catch (error) {
        console.error("Error update product quantity", error)
    }
}