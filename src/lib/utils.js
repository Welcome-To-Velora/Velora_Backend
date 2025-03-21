import jwt from "jsonwebtoken";

import { Product } from "../models/ProductModel.js";
import { Review } from "../models/ReviewModel.js";
import Order from "../models/OrderModel.js";

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

// Utility function to send success response
export const sendSuccessResponse = (response, statusCode, message, data = null) => {
    const responseData = { message };
    if (data) responseData.data = data;
    return response.status(statusCode).json(responseData);
};


// Utility function for email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(email);
};

// Helper function to find products by ID
export const findProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) {
        return sendErrorResponse(response, 404, "Product Not Found");
    }
    return product;
};

// Helper function to find order by ID
export const findOrderById = async (orderId, response) => {
    const order = await Order.findById(orderId);
    if (!order) {
        sendErrorResponse(response, 404, "Order Not Found");
    }
    return order;
};

// Helper function to find payment by ID
export const findPaymentById = async (paymentId, response) => {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
        sendErrorResponse(response, 404, "Payment Not Found");
    }
    return payment;
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
    const review = await Review.findOne({ productID, userID });
    if (!review) {
        return sendErrorResponse(response, 404, "Review Not Found");
    }
    return review;
};

// Helper function to get the wishlist for a user
export const getWishlistByUserID = async (userID) => {
    const wishlist = await Wishlist.findOne({ userID }).populate("products");
    if (!wishlist) {
        throw new Error("Wishlist not found");
    }
    return wishlist;
};

// Helper function to check if a product is already in the wishlist
export const isProductInWishlist = (wishlist, productID) => {
    return wishlist.products.some(p => p.productID.toString() === productID);
};