import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { sendErrorResponse } from '../lib/utils.js';

export const protectRoute = async (request, response, next) => {
    try {
        const token = request.cookies.jwt;

        if (!token) {
            return sendErrorResponse(response, 401, "Unauthorized Access");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If verification fails, the error will be thrown and caught in the catch block

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return sendErrorResponse(response, 404, "User Not Found");
        }

        request.user = user;  // Attach user to the request object
        next();

    } catch (error) {
        console.log("Error in protectRoute Middleware", error.message);

        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return sendErrorResponse(response, 401, "Token expired, Please login again");
        }

        return sendErrorResponse(response, 500, "Internal Server Error");
    }
};

export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};
