import { Cart } from "../models/CartModel.js";
import { Product } from "../models/ProductModel.js";
import { handleControllerError, sendErrorResponse, findProductById } from "../lib/utils";

export const getCart = async (request, response) => {
    try {
        const cart = await Cart.findOne({ userID: request.user.id })
            .populate({
                path: "items.productID",
                select: "name price image" // Only fetch necessary fields
            });

        if (!cart) return sendErrorResponse(response, 404, "Cart Not Found");

        response.status(200).json(cart);
    } catch (error) {
        return handleControllerError(response, error, "getCart");
    }
};

export const addToCart = async (request, response) => {
    try {
        const { productID, quantity } = request.body;

        // Check if the product exists
        const product = await findProductById(productID);
        if (!product) {
            return sendErrorResponse(response, 404, "Product Not Found");
        }

        // Check if the user already has a cart
        let cart = await Cart.findOne({ userID: request.user.id });

        if (!cart) {
            // If no cart exists, create a new one
            cart = await Cart.create({
                userID: request.user.id,
                items: [{ productID, quantity }]
            });
        } else {
            // If cart exists, check if the product is already in the cart
            const itemIndex = cart.items.findIndex(item => item.productID.toString() === productID);

            if (itemIndex > -1) {
                // If product exists, update the quantity
                cart.items[itemIndex].quantity += quantity;
            } else {
                // If product is not in cart, add it
                cart.items.push({ productID, quantity });
            }
        }

        await cart.save();
        response.status(200).json(cart);

    } catch (error) {
        return sendErrorResponse(response, error, "addToCart");
    }
};