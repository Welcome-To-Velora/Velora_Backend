import jwt from "jsonwebtoken";

import { Product } from "../models/ProductModel.js";
import { Review } from "../models/ReviewModel.js";

export const generateToken = (userId, role, response) => {
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    response.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, // Prevents XSS attacks - cross-site scripting attacks
        sameSite: "strict", // CSRF attacks prevention
        secure: process.env.NODE_ENV !== "development" // Set to false in development (use HTTP)
    });

    return token;
};


// Utility function to handle sending Status 500 error responses
export const handleControllerError = (response, error, location) => {
    console.error(`Error in ${location}:`, error.message);
    return sendErrorResponse(response, 500, "Internal Server Error", error.message);
};

// Utility function for sending error responses
export const sendErrorResponse = (response, status, message) => {
    return response.status(status).json({ message });
};


// Utility function for email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(email);
};

// Helper function to find products by ID
export const findProductById = async (id) => {
    return await Product.findById(id);
};

// Helper function to upload images to cloudinary
export const uploadImageToCloudinary = async (image) => {
    try {
        if (!image) return null;
        
        const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        return cloudinaryResponse.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Failed to upload image");
    }
};

// Helper function to find a product review
export const findUserReview = async (productID, userID) => {
    return await Review.findOne({ productID, userID });
};