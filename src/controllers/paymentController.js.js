import Payment from "../models/paymentModel.js";
import Order from "../models/OrderModel.js";
import { handleControllerError, sendErrorResponse, sendSuccessResponse, findPaymentById, findOrderById  } from "../lib/utils.js";

// Create payment and update the order status
export const createPayment = async (request, response) => {
    try {
        const { order, user, amount, paymentMethod, transactionId } = request.body;

        const existingOrder = await findOrderById(order, response);
        if (!existingOrder) return;

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

        return sendSuccessResponse(response, 200, "Payment status updated successfully", payment);

    } catch (error) {
        return handleControllerError(response, error, "createPayment");
    }
};

// Update payment and order status
export const updatePaymentStatus = async (request, response) => {
    try {
        const { status } = request.body;
        const payment = await findPaymentById(request.params.id, response);
        if (!payment) return;

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

        return sendSuccessResponse(response, 200, "Payment status updated successfully", payment);
        
    } catch (error) {
        return handleControllerError(response, error, "updatePaymentStatus");
    }
};

// Get All Payments
export const getAllPayments = async (request, response) => {
    try {
        const payments = await Payment.find();

        if (payments.length === 0) {
            return sendErrorResponse(response, 404, "No Payments Available");
        }

        return sendSuccessResponse(response, 200, "Payments retrieved successfully", payments);

    } catch (error) {
        return handleControllerError(response, error, "getAllPayments");
    }
};

// Get Payment By ID
export const getPaymentById = async (request, response) => {
    try {
        const payment = await findPaymentById(request.params.id, response);
        if (!payment) return;

        return sendSuccessResponse(response, 200, "Payment retrieved successfully", payment);

    } catch (error) {
        return handleControllerError(response, error, "getPaymentById");
    }
};


// Delete Payment
export const deletePayment = async (request, response) => {
    try {
        const payment = await findPaymentById(request.params.id, response);
        if (!payment) return;

        return sendSuccessResponse(response, 200, "Payment Deleted Successfully");

    } catch (error) {
        return handleControllerError(response, error, "deletePayment");
    }    
};