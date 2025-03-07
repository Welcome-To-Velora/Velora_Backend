import cloudinary from "../lib/cloudinary.js";

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

export const getFeaturedProducts = async (request, response) => {
    try {
        // Fetch Products that are marked as featured
        const featuredProducts = await Product.find({ isfeatured: true });

        if (featuredProducts.length === 0) {
            return sendErrorResponse(response, 404, "No featured products found");
        }

        response.json(featuredProducts);

    } catch (error) {
        console.log("Error in getFeaturedProducts Controller");
        return sendErrorResponse(response, 500, "Internal Server Error");
    }
};

export const createProduct = async (request, response) => {
    try {
        const {name, description, price, image, categoryID, dinosaur_type, stock} = request.body;

        let cloudinaryResponse = null;

        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" })
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            categoryID,
            dinosaur_type,
            stock
        })
    } catch (error) {
        
    }
};