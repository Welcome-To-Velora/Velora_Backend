import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    // Product Name: Required String
    name: {
        type: String,
        requirred: true,
    },
    // Product Description: Required String 
    description: {
        type: String,
        required: true,
    },
    // Product Price: Minimum price of 0, required number
    price: {
        type: Number,
        min: 0,
        required:true,
    },
    // Product Image: Required String (cloudinary)
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    // Category ID: References Category Schema - Required
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    // Dinosaur Type: Required String, Can be changed to enum
    dinosaur_type: {
        type: String,
        required: true,
    },
    // Stock: Required Number, Min 0
    stock: {
        type: Number,
        min: 0,
        required: true,
    },
    // Is Product Featured
    isFeatured: {
        type: Boolean,
        default: false,
    }
},{timestamps: true});

export const Product = mongoose.model("Product", productSchema);