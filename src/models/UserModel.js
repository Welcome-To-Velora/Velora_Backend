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
        enum: ["user", "admin"], // Limits the allowed values to admin and user
        default: "user", // Sets default value to be User
    },
}, {
    // createdAt, updatedAt
    timestamps: true
});

const User = mongoose.model("User", userSchema);



// Centralising password logic to make it clean, secure, and maintainable

// Automatically hashing password, preventing re-hashing, enforces security at the DB level
// Runs before saving a document
userSchema.pre("save", async function (next) {
    // Check if the password field has been modified
    if(!this.isModified("password")) return next();
    // If the password hasn't changed, it will skip hashing and continue
    try {
        // Generate salt for hashing
        const salt = await bcrypt.genSalt(10);

        // Hash the password using generated salt and bcrypt
        this.password = await bcrypt.hash(this.password, salt);
        next(); // move to the next middleware or save the document
    } catch (error) {
        next(error); // Pass any errors to mongoose
    }
});

userSchema.methods.comparePassword = async function (password) {
    // bcrypt.compare compares the provided password with the hashed password
    return bcrypt.compare(password, this.password); // Returns a promise that resolves to a boolean
}

export default User;