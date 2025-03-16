import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema(
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      products: [
        {
          productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          image: {
            type: String,
          },
          name: {
            type: String,
          },
          price: {
            type: Number,
          },
        },
      ],
    },
    { timestamps: true }
  );
  
WishlistSchema.index({ userID: 1, products: 1 }, { unique: true });

export const Wishlist = mongoose.model("Wishlist", WishlistSchema);


