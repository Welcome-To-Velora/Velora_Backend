import { Product } from "../models/ProductModel.js";
import { Category } from "../models/CategoryModel.js";
import { sendErrorResponse } from "../lib/utils.js";

export const getAllProducts = async (request, response) => {
    try {
        const products = await Product.find({}); // Find all products
        response.json({ products });
    } catch (error) {
        console.log("Error in the getAllProducts controller", error.message);
        return sendErrorResponse(response, 500, "Internal Server Error");
    }
};