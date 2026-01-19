import { NextResponse } from "next/server";
import { authenticate } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { BookingStatus } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { classId } = body;

        if (!classId) {
            return NextResponse.json({ error: "Class ID is required" }, { status: 400 });
        }

        // Check if class exists
        const yogaClass = await prisma.yogaClass.findUnique({
            where: { id: classId },
        });

        if (!yogaClass) {
            return NextResponse.json({ error: "Class not found" }, { status: 404 });
        }

        // Check if already booked
        const existingBooking = await prisma.booking.findFirst({
            where: {
                userId: user.id,
                classId: classId,
                status: {
                    in: [BookingStatus.PENDING, BookingStatus.CONFIRMED]
                }
            }
        });

        if (existingBooking) {
            // If pending, return existing. If confirmed, error.
            if (existingBooking.status === BookingStatus.CONFIRMED) {
                return NextResponse.json({ error: "You have already booked this class" }, { status: 409 });
            }
            return NextResponse.json(existingBooking);
        }

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                userId: user.id,
                classId: classId,
                status: BookingStatus.PENDING,
            },
            include: {
                yogaClass: true
            }
        });

        return NextResponse.json(booking, { status: 201 });

    } catch (error) {
        console.error("Error creating booking:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const bookings = await prisma.booking.findMany({
            where: { userId: user.id },
            include: { yogaClass: true, payment: true },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
