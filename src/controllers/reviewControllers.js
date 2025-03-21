import { Review } from "../models/ReviewModel.js";
import { Product } from "../models/ProductModel.js";
import { handleControllerError, sendErrorResponse, sendSuccessResponse, findUserReview } from "../lib/utils.js";

export const addReview = async (request, response) => {
    try {
        const { productID } = request.params;
        const { rating, reviewComment } = request.body;
        const { userID } = request.user;

        if (!await Product.exists({ _id: productID })) {
            return sendErrorResponse(response, 404, "Product Not Found");
        }

        const existingReview = await findUserReview(productID, userID);
        if (existingReview) {
            return sendErrorResponse(response, 400, "You Have Already Reviewed This Product");
        }

        const newReview = new Review({ productID, userID, rating, reviewComment });
        await newReview.save();

        return sendSuccessResponse(response, 201, "Review Added Successfully", newReview);

    } catch (error) {
        return handleControllerError(response, error, "addReview");
    }
};

export const getProductReviews = async (request, response) => {
    try {
        const { productID } = request.params;
        const reviews = await Review.find({ productID }).populate("userID", "fullName");

        return sendSuccessResponse(response, 200, "Reviews Retrieved Successfully", reviews);

    } catch (error) {
        return handleControllerError(response, error, "getProductReviews");
    }
};

export const deleteReview = async (request, response) => {
    try {
        const { productID } = request.params;
        const { userID } = request.user.id;
        
        const review = await findUserReview(productID, userID);

        await review.deleteOne(); // More direct deletion
        return sendSuccessResponse(response, 200, "Review Deleted Successfully");

    } catch (error) {
        return handleControllerError(response, error, "deleteReview");
    }
};