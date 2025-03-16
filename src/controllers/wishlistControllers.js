import mongoose from "mongoose";
import { Wishlist } from "../models/WishlistModel.js";
import { Product } from "../models/ProductModel.js";
import { sendErrorResponse, handleControllerError, getWishlistByUserID, isProductInWishlist } from "../lib/utils.js";

export const addToWishlist = async (request, response) => {
    try {
        const userID = request.user.id; 
        const { productID } = request.params;

        const product = await Product.findById(productID);
        if (!product) {
            return sendErrorResponse(response, 404, "Product not found");
        }

        let wishlist = await Wishlist.findOne({ userID });
        if (!wishlist) {
            wishlist = new Wishlist({
                userID,
                products: [{
                    productID: productID,
                    image: product.image,
                    name: product.name,
                    price: product.price,
                }]
            });
        } else {
            if (isProductInWishlist(wishlist, productID)) {
                return sendErrorResponse(response, 400, "Product already in your wishlist");
            }

            wishlist.products.push({
                productID: productID, 
                image: product.image,
                name: product.name,
                price: product.price,
            });
        }

        await wishlist.save();

        return response.status(201).json({
            message: "Product added to wishlist",
            wishlist
        });
    } catch (error) {
        return handleControllerError(response, error, "addToWishlist");
    }
};


export const getWishlist = async (request, response) => {
    try {
        const userID = request.user.id;
        const wishlist = await getWishlistByUserID(userID);

        return response.status(200).json(wishlist);

    } catch (error) {
        return handleControllerError(response, error, "getWishlist");
    }
};

export const removeFromWishlist = async (request, response) => {
    try {
        const userID = request.user.id;
        const { productID } = request.params;

        const wishlist = await getWishlistByUserID(userID);

        if (!isProductInWishlist(wishlist, productID)) {
            return sendErrorResponse(response, 404, "Product not found in wishlist");
        }

        wishlist.products = wishlist.products.filter(
            product => product.productID.toString() !== productID
        );

        await wishlist.save();

        return response.status(200).json({
            message: "Product removed from wishlist",
            wishlist
        });
    } catch (error) {
        return handleControllerError(response, error, "removeFromWishlist");
    }
};

export const clearWishlist = async (request, response) => {
    try {
        const userID = request.user.id;
        const wishlist = await getWishlistByUserID(userID);

        wishlist.products = [];

        await wishlist.save();

        return response.status(200).json({
            message: "Wishlist cleared",
            wishlist
        });
        
    } catch (error) {
        return handleControllerError(response, error, "clearWishlist");
    }
};