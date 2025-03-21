import { Review } from "../models/ReviewModel.js";
import { Product } from "../models/ProductModel.js";
import { handleControllerError, sendErrorResponse, sendSuccessResponse, findUserReview } from "../lib/utils.js";

export const addReview = async (request, response) => {
    try {
        const { productID } = request.params;
        const { rating, reviewComment } = request.body;
        const userID = request.user.id;

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

        if (reviews.length === 0) {
            return sendSuccessResponse(response, 200, "No reviews found for this product", []);
        }

        return sendSuccessResponse(response, 200, "Reviews Retrieved Successfully", reviews);

    } catch (error) {
        return handleControllerError(response, error, "getProductReviews");
    }
};

export const deleteReview = async (request, response) => {
    try {
        const reviewID = request.params.reviewID; 
        if (!reviewID) {
            return sendErrorResponse(response, 400, "Review ID is required");
        }

        const review = await Review.findById(reviewID);
        if (!review) {
            return sendErrorResponse(response, 404, "Review not found");
        }

        await review.deleteOne();

        return sendSuccessResponse(response, 200, "Review deleted successfully");
    } catch (error) {
        return handleControllerError(response, error, "deleteReview");
    }
};


export const updateReview = async (request, response) => {
    try {
        const reviewID = request.params.id;
        const { rating, reviewComment } = request.body;  

        const review = await Review.findById(reviewID);

        if (!review) {
            return sendErrorResponse(response, 404, "Review not found");
        }

        if (rating) review.rating = rating;  
        if (reviewComment) review.reviewComment = reviewComment; 

        await review.save();

        return sendSuccessResponse(response, 200, "Review Updated Successfully", review);

    } catch (error) {
        return handleControllerError(response, error, "updateReview");
    }
};
