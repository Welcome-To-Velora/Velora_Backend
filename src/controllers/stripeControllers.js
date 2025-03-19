import Stripe from "stripe";
import dotenv from "dotenv";

import Order from "../models/OrderModel.js";
import { handleControllerError, sendErrorResponse } from "../lib/utils.js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
export const createCheckoutSession = async (request, response) => {
	try {
		const { products } = request.body;

		if (!Array.isArray(products) || products.length === 0) {
			return sendErrorResponse(response, 400, "Invalid products");
		}

		const lineItems = products.map((product) => ({
			price_data: {
				currency: "aud", // Changed to AUD
				product_data: {
					name: product.name,
					images: [product.image],
				},
				unit_amount: Math.round(product.price * 100), // Convert to cents
			},
			quantity: product.quantity || 1,
		}));

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			metadata: {
				userId: request.user._id.toString(),
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		});

		response.status(200).json({ id: session.id });
	} catch (error) {
		return handleControllerError(response, error, "createOrders");
	}
};
