// this is the signup route

import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '@/lib/prisma';

// Validation schema
const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["USER", "TRAINER"]).optional(),
});

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validate input
        const result = signupSchema.safeParse(body);        // safeParse - parses the input and returns a result object 

        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", details: result.error.flatten() },
                { status: 400 }
            );
        }

        const { name, email, password, role } = result.data;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await hash(password, 10);

        // Create user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role === "TRAINER" ? "TRAINER" : "USER",
            },
        });

        // If role is TRAINER, create a Trainer profile
        if (role === "TRAINER") {
            await prisma.trainer.create({
                data: {
                    userId: newUser.id,
                    specialties: [], // Initialize with empty array
                }
            });
        }

        // Generate JWT
        const token = sign(
            { userId: newUser.id, email: newUser.email, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return success response with token
        return NextResponse.json(
            {
                message: "User created successfully",
                token,
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                }
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
