// this file is used to authenticate the user and check if the user is authorized to perform the action

import { verify } from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { User, Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET;

export interface AuthenticatedUser extends User {
    trainer?: {
        id: string;
    } | null;
}

// authenticate the user
export async function authenticate(req: Request): Promise<AuthenticatedUser | null> {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return null;
        }

        const token = authHeader.split(" ")[1];

        if (!JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return null;
        }

        // Verify the token and extract the userId
        const decoded = verify(token, JWT_SECRET) as { userId: string };

        if (!decoded.userId) {
            return null;
        }

        // Find the user by userId, also check if the user is a trainer
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: {
                trainer: {
                    select: {
                        id: true
                    }
                }
            }
        });

        return user;
    } catch (error) {
        return null;
    }
}

// check if the user is authorized to perform the action
export function isAuthorized(user: AuthenticatedUser, allowedRoles: Role[]): boolean {
    return allowedRoles.includes(user.role);
}
