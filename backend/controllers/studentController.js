import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import parentModel from "../models/parentModel.js";
 // Ensure correct path to model

export const loginParent = async (req, res) => {
    try {
        const { parentEmail, parentPassword } = req.body;

        // Find parent by email
        const parent = await parentModel.findOne({ parentEmail });
       

        // If parent doesn't exist, return error
        if (!parent) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Compare entered password with stored password
        const isMatch = await bcrypt.compare(parentPassword, parent.parentPassword);

        // If passwords match, generate JWT token
        if (isMatch) {
            // const token = jwt.sign({ id: parent._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set expiration time for token
            const token = jwt.sign({ email: parent.parentEmail }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.status(200).json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export default loginParent;
