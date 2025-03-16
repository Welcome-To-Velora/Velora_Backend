import { Review } from "../models/ReviewModel.js";
import { Product } from "../models/ProductModel.js";
import { handleControllerError, sendErrorResponse } from "../lib/utils.js";

export const addReview = async (request, response) => {
    try {
        const { productID } = request.params;
        const { rating, reviewComment } = request.body;
        const userID = request.user.id;

        const product = await Product.findById(productID);
        if (!product) {
            return sendErrorResponse(response, 404, "Product Not Found");
        }

        const existingReview = await Review.findOne({ productID, userID });
        if (existingReview) {
            return sendErrorResponse(response, 400, "You Have Already Reviewed This Product");
        }

        const newReview = new Review({ productID, userID, rating, reviewComment });
        await newReview.save();

        response.status(201).json({ 
            message: "Review Added Successfully",
            review: newReview
        });
    } catch (error) {
       return handleControllerError(response, error, "addReview");
    }
};
