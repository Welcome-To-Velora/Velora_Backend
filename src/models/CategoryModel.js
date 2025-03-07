import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    // Category Name: Required Unique String
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

export const Category = mongoose.model("Category", categorySchema);