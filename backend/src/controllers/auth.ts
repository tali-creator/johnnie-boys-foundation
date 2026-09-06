import { Request, Response } from "express";
import { prisma } from "../index";
import jwt from "jsonwebtoken";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function signToken(id: string, email: string): string {
  return jwt.sign({ id, email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as any,
  });
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const hashedPassword = hashPassword(password);
    if (admin.password !== hashedPassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = signToken(admin.id, admin.email);

    res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, name } = req.body;

    const existing = await prisma.admin.findUnique({ where: { email } });
    if (existing) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashPassword(password),
        name,
      },
    });

    const token = signToken(admin.id, admin.email);

    res.status(201).json({
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
}

export async function getProfile(req: any, res: Response): Promise<void> {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.adminId },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!admin) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
}
