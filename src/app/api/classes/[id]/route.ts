import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authenticate, isAuthorized } from "@/lib/auth-utils";
import { Role } from "@prisma/client";
import { z } from "zod";

// Shared validation schema for updates (partial allow)
const updateClassSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    startAt: z.string().transform((str) => new Date(str)).optional(),
    endAt: z.string().transform((str) => new Date(str)).optional(),
    capacity: z.number().int().positive("Capacity must be positive").optional(),
    priceCents: z.number().int().nonnegative("Price must be non-negative").optional(),
    location: z.string().optional(),
});

// GET a specific class
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const yogaClass = await prisma.yogaClass.findUnique({
            where: { id },
            include: {
                trainer: {
                    include: {
                        user: {
                            select: { name: true, email: true }
                        }
                    }
                }
            }
        });

        if (!yogaClass) {
            return NextResponse.json({ error: "Class not found" }, { status: 404 });
        }

        return NextResponse.json(yogaClass);
    } catch (error) {
        console.error("Error fetching class:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// PATCH update a class
export async function PATCH(
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
            where: { id }
        });

        if (!existingClass) {
            return NextResponse.json({ error: "Class not found" }, { status: 404 });
        }

        // Authorization check: Trainers can only update their own classes
        if (user.role === Role.TRAINER) {
            if (!user.trainer || existingClass.trainerId !== user.trainer.id) {
                return NextResponse.json({ error: "You do not have permission to edit this class" }, { status: 403 });
            }
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

        const updatedClass = await prisma.yogaClass.update({
            where: { id },
            data: parsedBody
        });

        return NextResponse.json(updatedClass);

    } catch (error) {
        console.error("Error updating class:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// DELETE a class
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
            where: { id }
        });

        if (!existingClass) {
            return NextResponse.json({ error: "Class not found" }, { status: 404 });
        }

        // Authorization check: Trainers can only delete their own classes
        if (user.role === Role.TRAINER) {
            if (!user.trainer || existingClass.trainerId !== user.trainer.id) {
                return NextResponse.json({ error: "You do not have permission to delete this class" }, { status: 403 });
            }
        }

        await prisma.yogaClass.delete({
            where: { id }
        });

        return NextResponse.json({ message: "Class deleted successfully" });

    } catch (error) {
        console.error("Error deleting class:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
