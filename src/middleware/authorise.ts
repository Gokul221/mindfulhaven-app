// This middleware checks for a valid JWT token in the Authorization header

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../lib/prisma";

// Removed top-level strict assertion to prevent build-time/module-load errors
// const JWT_SECRET = process.env.JWT_SECRET!;

interface TokenPayload extends JwtPayload {
  sub: string;
}

// Authorization middleware to protect API routes
export function withAuth(handler: NextApiHandler, opts?: { roles?: string[] }) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Get the Authorization header
      const auth = req.headers.authorization;
      if (!auth) {
        return res.status(401).json({ error: "Not authenticated" });
      }
      const token = auth.split(" ")[1];

      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error("JWT_SECRET is not defined");

      const payload = jwt.verify(token, secret) as TokenPayload;

      if (!payload?.sub) {
        return res.status(401).json({ error: "Invalid token payload" });
      }

      // Fetch the user from the database
      const user = await prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      if (opts?.roles && !opts.roles.includes(user.role)) {
        return res.status(403).json({ error: "Forbidden" });
      }

      // Attach user to request object
      req.user = user;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}
