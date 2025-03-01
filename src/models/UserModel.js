import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import { validateEmail, validatePhoneNumber } from "../lib/validators";

// Define User Schema
const userSchema = new mongoose.Schema({
    // Full Name: Required string
    fullName: {
        type: String,
        required: true,
    },
    // Email: Required, unique, and formatted correctly.
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validateEmail,
            message: props => `${props.value} is not a valid email address!` // Custom error message
        }
    },
    // Password: Required with a minimum length of 6 characters
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    // Phone Number: Optional but must be numeric and within 10-15 digits
    phoneNumber: {
        type: String,
        trim: true,
        validate: validatePhoneNumber,
            message: props => `${props.value} is not a valid phone number!` // Custom error message
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, {
    // createdAt, updatedAt
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;