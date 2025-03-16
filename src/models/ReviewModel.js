import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot be more than 5"],
    },
    reviewDate: {
        type: Date,
        default: Date.now
    },
},
    { timestamps: true }
);

// Prevents duplicate reviews from the same user or a product
ReviewSchema.index({ productID: 1, userID: 1, }, { unique: true });

export const Review = mongoose.model("Review", ReviewSchema);