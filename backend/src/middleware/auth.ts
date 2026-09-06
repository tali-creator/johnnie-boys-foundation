import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  adminId?: string;
  adminEmail?: string;
}

export function authenticateAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Access denied. No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    ) as { id: string; email: string };

    req.adminId = decoded.id;
    req.adminEmail = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
}
