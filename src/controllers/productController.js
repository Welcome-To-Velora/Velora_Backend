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
        const featuredProducts = await Product.find({ isFeatured: true });

        if (featuredProducts.length === 0) {
            return sendErrorResponse(response, 404, "No Featured Products Found");
        }

        response.json(featuredProducts);

    } catch (error) {
        console.log("Error in getFeaturedProducts Controller");
        return sendErrorResponse(response, 500, "Internal Server Error");
    }
};

export const getProductById = async (request, response) => {
    try {
        const product = await Product.findById(request.params.id);

        if (!product) {
            return sendErrorResponse(response, 404, "Product Not Found");
        }

        response.json(product);

    } catch (error) {
        console.log("Error in getProductById controller", error.message);
        return sendErrorResponse(response, 500, "Internal Server Error");
    }
};

export const createProduct = async (request, response) => {
    try {
        const { name, description, price, image, categoryID, dinosaur_type, stock, isFeatured } = request.body;

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
            stock,
            isFeatured
        })

        response.status(201).json(product);

    } catch (error) {
        console.log("Error in createProduct Controller", error.message);
        return sendErrorResponse(response, 500, "Server Error", error.message);
    }
};

export const deleteProduct = async (request, response) => {
    try {
        const product = await Product.findById(request.params.id);

        if (!product) {
            return sendErrorResponse(response, 404, "Product Not Found");
        }

        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0]; // This will get the ID of the image
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("Deleted image from cloudinary");
            } catch (error) {
                console.log("Error deleting image from cloudinary", error);
            }
        }

        await Product.findByIdAndDelete(request.params.id);

        response.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        return sendErrorResponse(response, 500, "Internal Server Error");
    }
};

export const updateProduct = async (request, response) => {
    try {
        const {name, description, price, image, categoryID, dinosaur_type, stock} = request.body;
        let updatedData = { name, description, price, categoryID, dinosaur_type, stock };

        if (image) {
            let cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
            updatedData.image = cloudinaryResponse.secure_url;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            request.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return sendErrorResponse(response, 404, "Product Not Found");
        }

        response.json(updatedProduct);
        
    } catch (error) {
        console.log("Error in updateProduct controller", error.message);
        return sendErrorResponse(response, 500, "Internal Server Error");
    }
};

export const searchProducts = async (request, response) => {
    try {
        const { query, category, minPrice, maxPrice, dinosaur_type, isFeatured } = request.query;

        let filters = {};

        if (query) {
            // Ensure case-insensitive search for product name
            filters.name = { $regex: query, $options: "i" };
        }
        if (category) {
            filters.categoryID = category;
        }
        if (minPrice || maxPrice) {
            filters.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };
        }
        if (dinosaur_type) {
            filters.dinosaur_type = dinosaur_type;
        }
        if (isFeatured) {
            filters.isFeatured = isFeatured === "true"; // Boolean check
        }
        const products = await Product.find(filters);

        if (products.length === 0) {
            return sendErrorResponse(response, 404, "No products found matching your search");
        }

        response.json(products);

    } catch (error) {
        console.log("Error in searchProducts controller", error.message);
        return sendErrorResponse(response, 500, "Internal Server Error");
    }
};

export const getProductsByCategory = async (request, response) => {
    try {
        // Fetch products using category ID from URL parameters
        const products = await Product.find({ categoryID: request.params.categoryID });

        if (products.length === 0) {
            return sendErrorResponse(response, 404, "No products found for this category");
        }

        response.json(products);

    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        return sendErrorResponse(response, 500, "Internal Server Error");
    }
};