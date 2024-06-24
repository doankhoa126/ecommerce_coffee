import supabase from '../config/connectDB.js';
import bcrypt from 'bcrypt'

export async function addUser(newUser) {
    try {
        const { data: user, error } = await supabase
            .from('user')
            .insert([newUser])
            .select()

        if (error) {
            throw error;
        }
        return user;
    } catch (error) {
        console.error("Error adding user:", error.message);
        throw error;
    }
}

export async function findUserByUsername(username) {
    try {
        const { data: user, error } = await supabase
            .from('user')
            .select('*')
            .eq('username', username)
            .single();

        if (error) {
            throw error;
        }

        return user;
    } catch (error) {
        console.error("Error finding user by usernamr:", error.message);
        throw error;
    }
}

export async function updateUserPassword(username, newPassword) {
    try {

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const { data, error } = await supabase
            .from('user')
            .update({ password: hashedPassword })
            .eq('username', username)
            .select()
        if (error) {
            throw error;
        }
        if (!data || data.length === 0) {
            throw new Error('Failed to update password');
        }
        console.log(data)
        return data
    } catch (error) {
        console.error("Error updating user password:", error.message);
        throw error;
    }
}