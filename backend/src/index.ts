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
import initiativeRoutes from "./routes/initiatives";
import submissionsRoutes from "./routes/submissions";

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
});

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Trust Render's reverse proxy ─────────────────────────────────────────────
// Required for rate-limiting and secure cookies to work correctly on Render
app.set("trust proxy", 1);

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet());

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Render health checks)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
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
app.use("/api/initiatives", initiativeRoutes);

// ─── Protected Routes (Admin) ─────────────────────────────────────────────────
app.use("/api/admin/auth", authRoutes);
app.use("/api/admin/upload", uploadRoutes);
app.use("/api/admin/posts", postRoutes);
app.use("/api/admin/team", teamRoutes);
app.use("/api/admin/trustees", trusteeRoutes);
app.use("/api/admin/programs", programRoutes);
app.use("/api/admin/analytics", analyticsRoutes);
app.use("/api/admin/initiatives", initiativeRoutes);
app.use("/api/admin/settings", settingsRoutes);
app.use("/api/admin/submissions", submissionsRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
async function start() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    });

    // ─── Graceful shutdown ───────────────────────────────────────────────────
    async function shutdown(signal: string) {
      console.log(`\n${signal} received — shutting down gracefully`);
      server.close(async () => {
        await prisma.$disconnect();
        console.log("✅ Database disconnected");
        process.exit(0);
      });

      // Force exit after 10s if graceful shutdown hangs
      setTimeout(() => {
        console.error("⚠️  Forced shutdown after timeout");
        process.exit(1);
      }, 10_000);
    }

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

start();

export default app;
