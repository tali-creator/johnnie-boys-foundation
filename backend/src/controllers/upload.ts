import { Request, Response } from "express";
import { uploadToR2, deleteFromR2 } from "../services/upload";

export async function uploadFile(req: Request, res: Response): Promise<void> {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }

    const folder = (req.body.folder as string) || "jbf";
    const result = await uploadToR2(req.file, folder);

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
    const { publicId } = req.body;

    if (!publicId) {
      res.status(400).json({ error: "publicId is required" });
      return;
    }

    // publicId is the R2 object key, e.g. "jbf/uuid.jpg"
    await deleteFromR2(publicId);
    res.json({ message: "File deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
}
