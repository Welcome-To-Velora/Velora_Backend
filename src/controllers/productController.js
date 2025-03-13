import cloudinary from "../lib/cloudinary.js";

import { Product } from "../models/ProductModel.js";
import { handleControllerError, findProductById, uploadImageToCloudinary } from "../lib/utils.js";

export const getAllProducts = async (request, response) => {
    try {
        const products = await Product.find({}); // Find all products
        response.json({ products });
    } catch (error) {
        return handleControllerError(response, error, "getAllProducts");
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
        return handleControllerError(response, error, "getFeaturedProducts");
    }
};

export const getProductById = async (request, response) => {
    try {
        const product = await findProductById(request.params.id);
        if (!product) {
            return sendErrorResponse(response, 404, "Product Not Found");
        }
        response.json(product);
    } catch (error) {
        return handleControllerError(response, error, "getProductById");
    }
};

export const createProduct = async (request, response) => {
    try {
        const { name, description, price, image, categoryID, dinosaur_type, stock, isFeatured } = request.body;

        const imageUrl = await uploadImageToCloudinary(image);

        const product = await Product.create({
            name,
            description,
            price,
            image: imageUrl || "",
            categoryID,
            dinosaur_type,
            stock,
            isFeatured
        });

        response.status(201).json(product);

    } catch (error) {
        return handleControllerError(response, error, "createProduct");
    }
};

export const deleteProduct = async (request, response) => {
    try {
        const product = await findProductById(request.params.id);

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
        return handleControllerError(response, error, "deleteProduct");
    }
};

export const updateProduct = async (request, response) => {
    try {
        const { name, description, price, image, categoryID, dinosaur_type, stock } = request.body;
        let updatedData = { name, description, price, categoryID, dinosaur_type, stock };

        const existingProduct = await findProductById(request.params.id);
        if (!existingProduct) {
            return sendErrorResponse(response, 404, "Product Not Found");
        }

        if (image) {
            updatedData.image = await uploadImageToCloudinary(image);
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            request.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        response.json(updatedProduct);

    } catch (error) {
        return handleControllerError(response, error, "updateProduct");
    }
};

export const searchProducts = async (request, response) => {
    try {
        const { query, category, minPrice, maxPrice, dinosaur_type, isFeatured } = request.query;

        // Construct filters dynamically
        const filters = {
            ...(query && { name: { $regex: query, $options: "i" } }), 
            ...(category && { categoryID: category }),
            ...(minPrice || maxPrice ? { price: { $gte: minPrice || 0, $lte: maxPrice || Infinity } } : {}),
            ...(dinosaur_type && { dinosaur_type }),
            ...(isFeatured && { isFeatured: isFeatured === "true" }) 
        };

        // Fetch products based on filters
        const products = await Product.find(filters);

        if (products.length === 0) {
            return sendErrorResponse(response, 404, "No products found matching your search");
        }

        response.json(products);

    } catch (error) {
        return handleControllerError(response, error, "searchProducts");
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
        return handleControllerError(response, error, "getProductsByCategory");
    }
};