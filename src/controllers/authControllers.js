import User from "../models/UserModel.js";

export const signup = async (request, response) => {
    const { fullName, email, password } = request.body;
    try {
        const userExists = await User.findOne({ email });
    
        if(userExists) {
            return response.status(400).json({
                message: "User already exists"
            });
        };
        const user = await User.create({ fullName, email, password });
        response.status(201).json({
            user,
            message: "User Created Successfully"
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return response.status(400).json({
                message: Object.values(error.errors).map(err => err.message) // Extract all validation messages
            });
        }
        response.status(500).json({ message: error.message });
    };
};

export const login = async (request, response) => {
    response.send("Login Route Called");
};

export const logout = async (request, response) => {
    response.send("Logout Route Called");
};