import Stripe from "stripe";
import dotenv from "dotenv";

import Order from "../models/OrderModel.js";
import { handleControllerError, sendErrorResponse } from "../lib/utils.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
export const createCheckoutSession = async (request, response) => {
    try {
        const { orderId } = request.body;
        const order = await Order.findById(orderId);

        if (!order) {
            return sendErrorResponse(response, 404, "Order Not Found");
        }

    } catch (error) {
        
    }
};