import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const protectRoute = async (request, response, next) => {
    try {

        const token = request.cookies.jwt

        if (!token) {
            return response.status(401).json({
                message: "Unauthorized Access"
            })
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return response.status(401).json({
                message: "Unauthorized Access"
            })
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return response.status(404).json({
                message: "User Not Found"
            })
        }

        request.user = user
        
        next()

    } catch (error) {
        console.log("Error in protectRoute Middlware", error.message);
        return response.status(500).json({
            message: "Internal Server Error"
        });
    };
};

export const adminRoute = (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		next();
	} else {
		return res.status(403).json({ message: "Access denied - Admin only" });
	}
};
