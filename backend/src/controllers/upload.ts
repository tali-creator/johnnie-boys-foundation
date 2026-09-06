import { Request, Response } from "express";
import { uploadToCloudinary, deleteFromCloudinary } from "../services/upload";

export async function uploadFile(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    const folder = (req.body.folder as string) || "jbf";
    const result = await uploadToCloudinary(req.file, folder);

    res.status(201).json({
      url: result.url,
      publicId: result.publicId,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
}

export async function deleteFile(req: Request, res: Response): Promise<void> {
  try {
    const { publicId, resourceType } = req.body;

    if (!publicId) {
      res.status(400).json({ error: "publicId is required" });
      return;
    }

    await deleteFromCloudinary(publicId, resourceType || "image");
    res.json({ message: "File deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete file" });
  }
}
