import { addUser, findUserByUsername, updateUserPassword } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { fullname, username, password, email, phone, birthday } = req.body;

    const usernameDB = findUserByUsername(username);

    if (usernameDB) {
        return res.status(409).json({ message: 'Username already exists' });
    } else {
        const data = {
            fullname: fullname,
            username: username,
            password: await bcrypt.hash(password, 10),
            email: email,
            phone: phone,
            birthday: birthday
        }
        try {
            const newUser = await addUser(data)
            res.status(201).json({ message: 'User registered successfully', user: newUser });

        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    }

}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const user = await findUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the plaintext password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // set cookie 
        res.cookie('userID', user.id, { maxAge: 3600000 })

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}

export const forgotPassword = async (req, res) => {
    const { username, newPassword } = req.body;

    try {
        // Check if the user exists
        const checkUsername = await findUserByUsername(username);

        if (!checkUsername) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's password
        const updatePassword = await updateUserPassword(username, newPassword);
        console.log(updatePassword + 'update password');

        if (updatePassword) {
            return res.status(200).json({ message: 'Password updated successfully', user: updatePassword });
        } else {
            throw new Error('Failed to update password');
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error updating password', error: error.message });
    }
};

export const logoutUser = async (req, res) => {
    // delete cookies
    res.clearCookie('userID');
    res.json({ message: 'Logged out' });
}