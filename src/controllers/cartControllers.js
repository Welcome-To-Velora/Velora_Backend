import { Cart } from "../models/CartModel.js";
import { Product } from "../models/ProductModel.js";
import { handleControllerError, sendErrorResponse, findProductById } from "../lib/utils.js";

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
      const userID = request.user.id; // Assuming you're using authentication
  
      // 🔹 Fetch product to get the price
      const product = await Product.findById(productID);
      if (!product) {
        return sendErrorResponse(response, 404, "Product Not Found");
      }
  
      // 🔹 Find the user's cart or create a new one
      let cart = await Cart.findOne({ userID });
  
      if (!cart) {
        cart = new Cart({ userID, items: [] });
      }
  
      // 🔹 Check if item already exists in cart
      const existingItem = cart.items.find((item) => item.productID.equals(productID));
  
      if (existingItem) {
        existingItem.quantity += quantity; // Update quantity
      } else {
        // 🔹 Add new item with `priceAtTime`
        cart.items.push({
          productID,
          quantity,
          priceAtTime: product.price, // Ensure price is added
        });
      }
  
      // 🔹 Save cart and send response
      await cart.save();
      response.status(200).json(cart);
    } catch (error) {
      return handleControllerError(response, error, "addToCart");
    }
  };


export const updateCartItem = async (request, response) => {
    try {
        const { productID } = request.params;
        const { quantity } = request.body;

        let cart = await Cart.findOne({ userID: request.user.id });
        if (!cart) return response.status(404).json({ message: "Cart not found" });

        const item = cart.items.find(item => item.productID.toString() === productID);
        if (!item) return sendErrorResponse(response, 404, "Product Not In Cart");

        item.quantity = quantity;
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.priceAtTime, 0);

        await cart.save();
        response.status(200).json(cart);
    } catch (error) {
        return handleControllerError(response, error, "updateCartItem");
    }
};

export const removeFromCart = async (request, response) => {
    try {
        const { productID } = request.params;

        let cart = await Cart.findOne({ userID: request.user.id });
        if (!cart) return sendErrorResponse(response, 404, "Cart Not Found");

        const initialItemCount = cart.items.length;

        // Filter out the item
        cart.items = cart.items.filter(item => item.productID.toString() !== productID);

        // Check if an item was actually removed
        if (cart.items.length === initialItemCount) {
            return sendErrorResponse(response, 400, "Item Not Found in Cart");
        }

        // Recalculate total price
        cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.priceAtTime, 0);

        await cart.save();
        response.status(200).json("Item Removed Successfully");
    } catch (error) {
        return handleControllerError(response, error, "removeFromCart");
    }
};

export const clearCart = async (request, response) => {
    try {
        const cart = await Cart.findOne({ userID: request.user.id });
        if (!cart) return sendErrorResponse(response, 404, "Cart Not Found");

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        response.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        return handleControllerError(response, error, "clearCart");
    }
};