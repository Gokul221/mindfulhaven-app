// this file is used to get the user details from the database

import { NextResponse } from "next/server";
import { authenticate } from "@/lib/auth-utils";

export async function GET(req: Request) {
    const user = await authenticate(req);

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return user details sans sensitive info like password
    // The authenticate function returns a Prisma User object which might have password
    // We should be careful to destructure it or select specific fields if not already safe.
    // Looking at auth-utils.ts, it returns the whole user object including password hash potentially if not excluded in 'findUnique' or 'authenticate' logic.
    // Let's explicitly return safe fields.

    const { password, ...safeUser } = user; // remove password from user object

    return NextResponse.json(safeUser);
}
