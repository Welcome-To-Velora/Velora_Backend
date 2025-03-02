import jwt from "jsonwebtoken";

export const generateToken = (userId, response) => {
    const token =  jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    });

    response.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, // Prevents XSS attacks - cross-site scripting attacks
        sameSite: "strict", //CSRFattacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    });

    return token
};


// Utility function to handle sending error responses
export const sendErrorResponse = (response, status, message) => {
    return response.status(status).json({ message });
};


// Utility function for email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(email);
};