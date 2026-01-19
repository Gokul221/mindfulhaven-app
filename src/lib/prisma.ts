// This file sets up a singleton instance of Prisma Client to avoid multiple instances
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Prevent multiple instances of Prisma Client in development
const prisma = global.prisma ?? new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
