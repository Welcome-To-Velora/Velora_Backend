import mongoose from "mongoose";
import { Product } from "./ProductModel.js";

const WishlistSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            validate: {
                validator: function (value) {
                    // Validate that each product in the wishlist exists
                    return mongoose.Types.ObjectId.isValid(value);
                },
                message: "Invalid product ID",
            }
        }
    ],
},
{ 
    timestamps: true 
});

WishlistSchema.index({ userID: 1, products: 1 }, { unique: true });

export const Wishlist = mongoose.model("Wishlist", WishlistSchema);