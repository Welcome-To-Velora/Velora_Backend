import { handleControllerError, sendErrorResponse } from "../lib/utils.js";
import Order from "../models/OrderModel.js";
import { Cart } from "../models/CartModel.js";

export const createOrderFromCart = async (request, response) => {
    try {
        const userId = request.user.id;
        
        const cart = await Cart.findOne({ userID: userId }).populate("items.productID");
        if (!cart || cart.items.length === 0) {
            return response.status(400).json({ message: "Your cart is empty" });
        }

        const order = new Order({
            user: userId,
            products: cart.items.map(item => ({
                product: item.productID._id,
                quantity: item.quantity,
                price: item.priceAtTime,
            })),
            totalAmount: cart.totalPrice,
            paymentStatus: "Pending",
            paymentMethod: "Other",
        });

        await order.save();

        await Cart.findOneAndUpdate({ userID: userId }, { items: [], totalPrice: 0 });

        return response.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        return handleControllerError(response, error, "createOrderFromCart");
    }
};

// Get all orders
export const getOrders = async (request, response) => {
    try {
        const orders = await Order.find().populate("user", "name email").populate("products.product", "name price");
        return response.status(201).json(orders);

    } catch (error) {
        return handleControllerError(response, error, "getOrders");
    }
};

// Get orders by ID
export const getOrderById = async (request, response) => {
    try {
        const order = await Order.findById(request.params.id).populate("user").populate("products.product");
        if (!order) {
            return sendErrorResponse(response, 404, "Order Not Found");
        }

        return response.status(200).json(order);

    } catch (error) {
        return handleControllerError(response, error, "getOrderById");
    }
};

// Update order status
export const updateOrderStatus = async (request, response) => {
    try {
        const order = await Order.findById(request.params.id);
        if (!order) {
            return sendErrorResponse(response, 404, "Order Not Found");
        }

        order.status = request.body.status || order.status;
        const updatedOrder = await order.save();

        return response.status(200).json(updatedOrder);
    } catch (error) {
        return handleControllerError(response, error, "updateOrderStatus");
    }
};

// Delete an order
export const deleteOrder = async (request, response) => {
    try {
        await Order.findByIdAndDelete(request.params.id);
        return response.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        return handleControllerError(response, error, "deleteOrder");
    }
};