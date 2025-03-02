import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    },
    // Password: Required with a minimum length of 6 characters
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"], // Limits the allowed values to admin and user
        default: "user", // Sets default value to be User
    },
}, {
    // createdAt, updatedAt
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;