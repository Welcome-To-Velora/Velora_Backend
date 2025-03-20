import Payment from "../models/paymentModel.js";
import Order from "../models/OrderModel.js";
import { handleControllerError, sendErrorResponse } from "../lib/utils.js";

// Create payment and update the order status
export const createPayment = async (request, response) => {
    try {
        const { order, user, amount, paymentMethod, transactionId } = request.body;

        const existingOrder = await Order.findById(order);
        if (!existingOrder) {
            return sendErrorResponse(response, 404, "Order Not Found");
        }

        if (existingOrder.totalAmount !== amount) {
            return sendErrorResponse(response, 400, "Payment Amount Does Not Match Order Total");
        }

        const payment = new Payment({
            order,
            user,
            amount,
            paymentMethod,
            transactionId,
            status: "Pending",
        });

        await payment.save();

        existingOrder.payment = payment._id;
        await existingOrder.save();

        response.status(201).json({ message: "Payment created successfully", payment });

    } catch (error) {
        return handleControllerError(response, error, "createPayment");
    }
};

// Update payment and order status
export const updatePaymentStatus = async (request, response) => {
    try {
        const { status } = request.body;
        const payment = await Payment.findById(request.params.id);

        if (!payment) {
            return sendErrorResponse(response, 400, "Payment Not Found");
        }

        if (!["Pending", "Completed", "Failed"].includes(status)) {
            return sendErrorResponse(response, 400, "Invalid Status Update");
        }

        payment.status = status;
        await payment.save();

        if (status === "Completed") {
            const order = await Order.findById(payment.order);
            if (order) {
                order.status = "Paid";
                await order.save();
            }
        }

        response.status(200).json({ message: "Payment status updated successfully", payment });
    } catch (error) {
        return handleControllerError(response, error, "updatePaymentStatus");
    }
};

// Get All Payments

// Get Payment By ID

// Delete Payment