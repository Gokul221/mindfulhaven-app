import { NextResponse } from "next/server";
import { authenticate } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import Razorpay from "razorpay";

export async function POST(req: Request) {
    try {
        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { bookingId } = body;

        if (!bookingId) {
            return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
        }

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { yogaClass: true },
        });

        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        if (booking.userId !== user.id) {
            return NextResponse.json({ error: "Unauthorized access to this booking" }, { status: 403 });
        }

        // Initialize Razorpay
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID!,
            key_secret: process.env.RAZORPAY_KEY_SECRET!,
        });

        // Create order options
        // Amount is in smallest currency unit (paise for INR)
        // priceCents in schema is also treated as smallest unit (paise) for INR payments based on our update
        const amount = booking.yogaClass.priceCents;
        const options = {
            amount: amount,
            currency: "INR",
            receipt: `receipt_${bookingId}`,
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            orderId: order.id,
            amount: amount,
            currency: "INR",
            keyId: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
