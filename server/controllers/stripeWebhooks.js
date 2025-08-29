import stripe from "stripe";
import Booking from "../models/Booking.js";

// api to handle stripe webhooks

export const stripeWebhooks = async (request, response) => {
    // for stripe gateway initialize 
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object;
            const { bookingId } = session.metadata;
            
            // for marking payment as paid
            await Booking.findByIdAndUpdate(bookingId, {isPaid: true, paymentMethod: "Stripe"});
            console.log(`Payment successful for booking: ${bookingId} (checkout.session.completed)`);
            break;

        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            const bookingIdFromPI = paymentIntent.metadata?.bookingId;
            
            if (bookingIdFromPI) {
                await Booking.findByIdAndUpdate(bookingIdFromPI, {isPaid: true, paymentMethod: "Stripe"});
                console.log(`Payment successful for booking: ${bookingIdFromPI} (payment_intent.succeeded)`);
            } else {
                console.log("No bookingId found in payment_intent metadata");
            }
            break;

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }
    response.json({received: true});
}