import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { sendErrorResponse } from '../lib/utils.js';

export const protectRoute = async (request, response, next) => {
    try {
        // Access the JWT token from cookies
        const token = request.cookies.jwt;
        console.log("JWT Token from cookie:", token); // Debugging log

        // If there's no token, return unauthorized error
        if (!token) {
            return sendErrorResponse(response, 401, "Unauthorized Access - No token provided");
        }

        // Verify the JWT token and decode it
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Debugging log

        // Find the user by ID from the decoded token (excluding password)
        const user = await User.findById(decoded.userId).select("-password");

        // If no user found, return a "User Not Found" error
        if (!user) {
            return sendErrorResponse(response, 404, "User Not Found");
        }

        // Attach the user object to the request for further use
        request.user = user;
        next();  // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("Error in protectRoute Middleware:", error.message); // Debugging log
        
        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return sendErrorResponse(response, 401, "Token expired, please login again");
        }

        if (error.name === "JsonWebTokenError") {
            return sendErrorResponse(response, 401, "Invalid token, please login again");
        }

        // Handle any other errors
        return sendErrorResponse(response, 500, "Internal Server Error");
    }
};

export const adminRoute = (request, response, next) => {
    console.log("User Role:", request.user?.role); // Debugging log
    
    if (request.user && request.user.role === "admin") {
        next();
    } else {
        return response.status(403).json({ message: "Access denied - Admin only" });
    }
};
