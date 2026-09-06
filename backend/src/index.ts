import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import { errorHandler } from "./middleware/errorHandler";
import { generalLimiter } from "./middleware/rateLimiter";

// Routes
import postRoutes from "./routes/posts";
import teamRoutes from "./routes/team";
import trusteeRoutes from "./routes/trustees";
import programRoutes from "./routes/programs";
import contactRoutes from "./routes/contact";
import volunteerRoutes from "./routes/volunteer";
import enrollRoutes from "./routes/enroll";
import donationRoutes from "./routes/donations";
import uploadRoutes from "./routes/upload";
import authRoutes from "./routes/auth";
import settingsRoutes from "./routes/settings";
import trackRoutes from "./routes/track";
import analyticsRoutes from "./routes/analytics";

export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(generalLimiter);

// ─── Public Routes ────────────────────────────────────────────────────────────
app.use("/api/posts", postRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/trustees", trusteeRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/enroll", enrollRoutes);
app.use("/api/donate", donationRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/track", trackRoutes);

// ─── Protected Routes (Admin) ─────────────────────────────────────────────────
app.use("/api/admin/auth", authRoutes);
app.use("/api/admin/upload", uploadRoutes);
app.use("/api/admin/posts", postRoutes);
app.use("/api/admin/team", teamRoutes);
app.use("/api/admin/trustees", trusteeRoutes);
app.use("/api/admin/programs", programRoutes);
app.use("/api/admin/analytics", analyticsRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API docs: http://localhost:${PORT}/api/health`);
});

export default app;
