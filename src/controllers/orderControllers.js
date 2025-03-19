import { handleControllerError } from "../lib/utils";
import Order from "../models/OrderModel.js";

// Create an Order
export const createOrder = async (request, response) => {
    try {
        const { user, products, totalAmount } = request.body;

        const order = new Order({
            user,
            products,
            totalAmount,
            paymentStatus: "Pending",
        });

        await order.save();
        response.status(201).json(order);

    } catch (error) {
        return handleControllerError(response, error, "createOrder");
    }
};

// Get all orders
export const getOrders = async (request, response) => {
    try {
        const orders = await Order.find().populate("user", "name email").populate("products.product", "name price");
        return response.json(orders);

    } catch (error) {
        return handleControllerError(response, error, "getOrders");
    }
};