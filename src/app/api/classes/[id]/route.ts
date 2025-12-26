// this file is used to update and delete a class

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticate, isAuthorized } from "@/lib/auth-utils";
import { Role } from "@prisma/client";
import { z } from "zod";

const updateClassSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    startAt: z.string().transform((str) => new Date(str)).optional(),
    endAt: z.string().transform((str) => new Date(str)).optional(),
    capacity: z.number().int().positive("Capacity must be positive").optional(),
    priceCents: z.number().int().nonnegative("Price must be non-negative").optional(),
    location: z.string().optional(),
});

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {


    try {
        const { id } = await params;

        const user = await authenticate(req);
        if (!user || !isAuthorized(user, [Role.ADMIN, Role.TRAINER])) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        let parsedBody;
        try {
            parsedBody = updateClassSchema.parse(body);
        } catch (error) {
            if (error instanceof z.ZodError) {
                return NextResponse.json({ error: error.errors }, { status: 400 });
            }
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        }

        const existingClass = await prisma.yogaClass.findUnique({
            where: { id: id }
        });

        if (!existingClass) {
            return NextResponse.json({ error: "Class not found" }, { status: 404 });
        }

        if (user.role === Role.TRAINER) {
            // Trainer can only update their own class
            if (existingClass.trainerId !== user.trainer?.id) {
                return NextResponse.json({ error: "Forbidden: You can only update your own classes" }, { status: 403 });
            }
        }

        const updatedClass = await prisma.yogaClass.update({
            where: { id: id },
            data: {
                ...parsedBody
            }
        });

        return NextResponse.json(updatedClass);

    } catch (error) {
        console.error("Error updating class:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const user = await authenticate(req);
        if (!user || !isAuthorized(user, [Role.ADMIN, Role.TRAINER])) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const existingClass = await prisma.yogaClass.findUnique({
            where: { id: id }
        });

        if (!existingClass) {
            return NextResponse.json({ error: "Class not found" }, { status: 404 });
        }

        if (user.role === Role.TRAINER) {
            if (existingClass.trainerId !== user.trainer?.id) {
                return NextResponse.json({ error: "Forbidden: You can only delete your own classes" }, { status: 403 });
            }
        }

        await prisma.yogaClass.delete({
            where: { id: id }
        });

        return NextResponse.json({ message: "Class deleted successfully" });

    } catch (error) {
        console.error("Error deleting class:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
