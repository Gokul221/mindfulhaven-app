// this file is used to create, update and delete a class

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticate, isAuthorized } from "@/lib/auth-utils";
import { Role } from "@prisma/client";
import { z } from "zod";

// validate the request body
const createClassSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    startAt: z.string().transform((str) => new Date(str)),
    endAt: z.string().transform((str) => new Date(str)),
    capacity: z.number().int().positive("Capacity must be positive"),
    priceCents: z.number().int().nonnegative("Price must be non-negative"),
    location: z.string().optional(),
    trainerId: z.string().optional() // Optional in schema because we might infer it
});

// GET all classes
export async function GET() {
    try {
        const classes = await prisma.yogaClass.findMany({
            include: {
                trainer: {
                    include: {
                        user: {
                            select: { name: true, email: true }
                        }
                    }
                }
            },
            orderBy: {
                startAt: 'asc'
            }
        });
        return NextResponse.json(classes);
    } catch (error) {
        console.error("Error fetching classes:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// POST create a new class
export async function POST(req: Request) {
    try {
        const user = await authenticate(req);
        if (!user || !isAuthorized(user, [Role.ADMIN, Role.TRAINER])) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        // validate the request body
        let parsedBody;
        try {
            parsedBody = createClassSchema.parse(body);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json({ error: error.errors }, { status: 400 });
            }
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        let trainerId = parsedBody.trainerId;

        if (user.role === Role.TRAINER) {
            // A trainer can only create classes for themselves
            if (!user.trainer) {
                return NextResponse.json({ error: "Trainer profile not found" }, { status: 400 });
            }
            trainerId = user.trainer.id;
        } else if (user.role === Role.ADMIN) {
            // Admins must specify a trainerId
            if (!trainerId) {
                return NextResponse.json({ error: "Trainer ID is required for Admin" }, { status: 400 });
            }
            // Optional: verify that the trainerId exists
            const trainerExists = await prisma.trainer.findUnique({ where: { id: trainerId } });
            if (!trainerExists) {
                return NextResponse.json({ error: "Trainer not found" }, { status: 404 });
            }
        }

        // create the class
        const yogaClass = await prisma.yogaClass.create({
            data: {
                title: parsedBody.title,
                description: parsedBody.description,
                startAt: parsedBody.startAt,
                endAt: parsedBody.endAt,
                capacity: parsedBody.capacity,
                priceCents: parsedBody.priceCents,
                location: parsedBody.location,
                trainerId: trainerId!
            }
        });

        return NextResponse.json(yogaClass, { status: 201 });

    } catch (error) {
        console.error("Error creating class:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
