import { NextResponse } from "next/server";
import { authenticate } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { PaymentProvider, PaymentStatus, BookingStatus } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { orderCreationId, razorpayPaymentId, razorpaySignature, bookingId } = body;

        if (!orderCreationId || !razorpayPaymentId || !razorpaySignature || !bookingId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Verify Signature
        // expectedSignature = HMAC_SHA256(orderCreationId + "|" + razorpayPaymentId, secret)
        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature) {
            return NextResponse.json({ error: "Invalid transaction signature" }, { status: 400 });
        }

        // Signature is valid, update database

        // 1. Fetch booking to get amount and verify it exists
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { yogaClass: true },
        });

        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }

        // 2. Create Payment Record and Update Booking in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create Payment
            const payment = await tx.payment.create({
                data: {
                    provider: PaymentProvider.RAZORPAY,
                    providerId: razorpayPaymentId,
                    userId: user.id,
                    amountCents: booking.yogaClass.priceCents,
                    currency: "INR",
                    status: PaymentStatus.SUCCEEDED,
                    metadata: {
                        orderId: orderCreationId,
                        signature: razorpaySignature
                    }
                }
            });

            // Update Booking
            const updatedBooking = await tx.booking.update({
                where: { id: bookingId },
                data: {
                    status: BookingStatus.CONFIRMED,
                    paymentId: payment.id
                }
            });

            return { payment, updatedBooking };
        });

        return NextResponse.json({ success: true, paymentId: result.payment.id });

    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
