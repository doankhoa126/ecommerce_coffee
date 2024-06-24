import supabase from '../config/connectDB.js'

export async function getAllProducts() {
    try {
        const { data, error } = await supabase
            .from('product')
            .select()

        if (error) {
            throw error;
        }
        if (data.length === 0) {
            throw new Error('No products')
        }
        return data
    } catch (error) {
        console.error("Error getting all products:", error.message);
        throw error
    }
}

export async function getProductById(id) {
    try {
        const { data, error } = await supabase
            .from('product')
            .select()
            .eq('id', id);

        if (error) {
            throw error
        }
        return data
    } catch (error) {
        console.error(error.message)
        throw error
    }
}