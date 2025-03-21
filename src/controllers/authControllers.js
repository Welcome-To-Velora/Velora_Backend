import User from "../models/UserModel.js";
import { generateToken } from "../lib/utils.js";
import { handleControllerError, sendErrorResponse, sendSuccessResponse, validateEmail } from "../lib/utils.js";

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword 
        });

        if (newUser) {
            // Generate JWT here with user ID and role
            generateToken(newUser._id, newUser.role, response);
            await newUser.save();

            return sendSuccessResponse(response, 201, "User created successfully", {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
            });

        } else {
            sendErrorResponse(response, 400, "Invalid User Data");
        };

    } catch (error) {
        return handleControllerError(response, error, "signup");
    };
};

export const login = async (request, response) => {
    const { email, password } = request.body;

    try {
        // Check if email and password are provided
        if (!email || !password) {
            return sendErrorResponse(response, 400, "Email and password are required");
        };

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return sendErrorResponse(response, 400, "Invalid email or password");
        };

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return sendErrorResponse(response, 400, "Invalid email or password");
        };

        // Generate the JWT token (include user role)
        const token = generateToken(user._id, user.role, response);

        // Send response with the user data and redirect to the appropriate dashboard
        if (user.role === 'admin') {
            // Redirect admin to dashboard (or send a URL to the frontend)
            return sendSuccessResponse(response, 200, "Login successful. Redirecting to Admin Dashboard.", {
                redirectTo: "/admin/dashboard",
            });
        };

        // If it's a regular user, send a response without redirecting to admin dashboard
        return sendSuccessResponse(response, 200, "Login successful. Redirecting to User Homepage.", {
            redirectTo: "/user/home",
        });

    } catch (error) {
        return handleControllerError(response, error, "login");
    };
};

{/*         This is an example for the frontend on how we would handle the role in the Token and which page to redirect them too :)
    
   const handleLogin = async (email, password) => {
    try {
        const response = await axios.post("/login", { email, password });

        if (response.data.redirectTo) {
            // Redirect based on the response
            window.location.href = response.data.redirectTo;
        }

        // Optionally, you can store the token and user details in localStorage or context
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

    } catch (error) {
        console.error("Login failed", error);
    }
}; */}


export const logout = async (request, response) => {
    try {
        
        response.cookie("jwt", "", {maxAge:0})
        return sendSuccessResponse(response, 200, "Logged Out Successfully");

    } catch (error) {
        return handleControllerError(response, error, "logout");
    };
};