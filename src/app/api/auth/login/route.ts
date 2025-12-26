// this is the login route

import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // validate the request body
        const { email, password } = loginSchema.parse(body);

        if (!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        const token = sign({ userId: user.id }, JWT_SECRET!, {
            expiresIn: "1h",
        });
        return NextResponse.json({ token });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}