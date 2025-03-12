import { Category } from "../models/CategoryModel.js";
import { sendErrorResponse } from "../lib/utils.js";

export const getAllCategories = async (request, response) => {
    try {
        const categories = await Category.find({});
        response.json(categories);

    } catch (error) {
        console.log("Error in getAllCategories", error.message);
        return sendErrorResponse(response, 500, "Internal Server Error");
    }
};