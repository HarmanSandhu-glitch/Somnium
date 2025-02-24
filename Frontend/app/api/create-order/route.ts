import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Validate environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Missing Razorpay credentials in environment variables");
}

// Define allowed subscription amounts
const VALID_AMOUNTS = [499, 999, 1999];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount } = body;
    if (!amount || !VALID_AMOUNTS.includes(amount)) {
      return NextResponse.json(
        {
          error:
            "Invalid amount. Must be one of the valid subscription amounts.",
          status: 400,
        },
        { status: 400 }
      );
    }

    const receiptId = `rcpt_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 15)}`;

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: receiptId,
      payment_capture: 1, // Auto capture payment
      notes: {
        type: "subscription",
        amount: amount,
      },
    });

    // Return successful response
    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: 200,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Payment creation error:", error);

    // Check if it's a Razorpay API error
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Payment initialization failed",
          message: error.message,
          status: 400,
        },
        { status: 400 }
      );
    }

    // Return generic error for unknown errors
    return NextResponse.json(
      {
        error: "Internal server error",
        status: 500,
      },
      { status: 500 }
    );
  }
}

// Webhook handler for payment verification (optional but recommended)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    // Verify the payment signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Payment is verified
      return NextResponse.json({
        verified: true,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        status: 200,
      });
    } else {
      return NextResponse.json(
        {
          error: "Payment verification failed",
          status: 400,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      {
        error: "Payment verification failed",
        status: 500,
      },
      { status: 500 }
    );
  }
}
