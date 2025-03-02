import User from "../models/UserModel.js";
import { generateToken } from "../lib/utils.js";
import { sendErrorResponse, validateEmail } from "../lib/utils.js";

import bcrypt from "bcryptjs";

export const signup = async (request, response) => {
    const { fullName, email, password } = request.body;
    try {
        if (!fullName || !email || !password) {
            return sendErrorResponse(response, 400, "All fields are required");
        };

        if (password.length < 6) {
            return sendErrorResponse(response, 400, "Password must be at least 6 characters");
        };

        if (!validateEmail(email)) {
            return sendErrorResponse(response, 400, "Invalid email format");
        };

        const user = await User.findOne({ email });

        if (user) return sendErrorResponse(response, 400, "Email already exists");

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword 
        });

        if (newUser) {
            // Generate JWT here
            generateToken(newUser._id, response)
            await newUser.save();

            response.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
            });

        } else {
            response.status(400).json({
                message: "Invalid User Data"
            });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        sendErrorResponse(response, 500, "Internal Server Error");
    };
};

export const login = async (request, response) => {
    response.send("Login Route Called");
};

export const logout = async (request, response) => {
    response.send("Logout Route Called");
};