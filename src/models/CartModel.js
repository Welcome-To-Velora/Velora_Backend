import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    // User ID: References User Schema - Required
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            // Product ID: References Product Schema - Required
            _id: false,
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            // Quantity: Required number with a minimum value of 1
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            // Stores the price when added to the cart
            priceAtTime: {
                type: Number,
                required: true
            }
        }
    ],
    // Total price of cart - Required with a default of 0 if cart is empty
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
        min: [0, "Total price cannot be negative"],
        set: (v) => parseFloat(v.toFixed(2)),
    }
}, { timestamps: true });

// Middleware to calculate total price before saving
cartSchema.pre("save", function (next) {
    this.totalPrice = this.items.reduce((sum, item) => sum + item.quantity * item.priceAtTime, 0);
    next();
});

export const Cart = mongoose.model("Cart", cartSchema);