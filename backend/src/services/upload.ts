import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import multer from "multer";
import { randomUUID } from "crypto";
import path from "path";

// ─── R2 Client ────────────────────────────────────────────────────────────────

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME!;

/** Base URL of the R2 public bucket (no trailing slash). */
const PUBLIC_URL = (process.env.R2_PUBLIC_URL || "").replace(/\/$/, "");

// ─── Multer (memory storage — same as before) ─────────────────────────────────

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/webm",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type not supported. Upload images or videos only."));
    }
  },
});

// ─── Upload ───────────────────────────────────────────────────────────────────

/**
 * Upload a file to Cloudflare R2 and return its public URL and object key.
 *
 * The object key is: `<folder>/<uuid><ext>`
 * e.g. "jbf/a1b2c3d4-…-ef.jpg"
 */
export async function uploadToR2(
  file: Express.Multer.File,
  folder: string = "jbf"
): Promise<{ url: string; publicId: string }> {
  const ext = path.extname(file.originalname).toLowerCase() || "";
  const key = `${folder}/${randomUUID()}${ext}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentLength: file.size,
    })
  );

  const url = `${PUBLIC_URL}/${key}`;
  return { url, publicId: key };
}

// ─── Delete ───────────────────────────────────────────────────────────────────

/**
 * Delete a file from Cloudflare R2 by its object key.
 *
 * The `publicId` stored in the database is the full object key
 * (e.g. "jbf/a1b2c3d4-…-ef.jpg"), so we can pass it directly.
 */
export async function deleteFromR2(key: string): Promise<void> {
  await r2.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
}
