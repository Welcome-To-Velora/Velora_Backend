import { Review } from "../models/ReviewModel.js";
import { Product } from "../models/ProductModel.js";
import { handleControllerError, sendErrorResponse, findUserReview } from "../lib/utils.js";

export const addReview = async (request, response) => {
    try {
        const { productID } = request.params;
        const { rating, reviewComment } = request.body;
        const { userID } = request.user.id;

        if (!await Product.exists({ _id: productID })) {
            return sendErrorResponse(response, 404, "Product Not Found");
        }

        if (await findUserReview(productID, userID)) {
            return sendErrorResponse(response, 400, "You Have Already Reviewed This Product");
        }

        const newReview = new Review({ productID, userID, rating, reviewComment });
        await newReview.save();

        return response.status(201).json({
            message: "Review Added Successfully",
            review: newReview
        });
    } catch (error) {
        return handleControllerError(response, error, "addReview");
    }
};

export const getProductReviews = async (request, response) => {
    try {
        const { productID } = request.params;
        const reviews = await Review.find({ productID }).populate("userID", "fullName");

        return response.status(200).json(reviews);
    } catch (error) {
        return handleControllerError(response, error, "getProductReviews");
    }
};

export const deleteReview = async (request, response) => {
    try {
        const { productID } = request.params;
        const { userID } = request.user.id;
        
        const review = await findUserReview(productID, userID);
        if (!review) {
            return sendErrorResponse(response, 404, "Review Not Found");
        }

        await review.deleteOne(); // More direct deletion
        return response.status(200).json({ message: "Review Deleted Successfully"});

    } catch (error) {
        return handleControllerError(response, error, "deleteReview");
    }
};