import { handleControllerError, sendErrorResponse } from "../lib/utils";
import Order from "../models/OrderModel.js";

// Create an Order
export const createOrder = async (request, response) => {
    try {
        const { user, products, totalAmount } = request.body;

        const newOrder = new Order({
            user,
            products,
            totalAmount,
        });

        const savedOrder = await newOrder.save();
        return response.status(201).json(savedOrder);

    } catch (error) {
        return handleControllerError(response, error, "createOrder");
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