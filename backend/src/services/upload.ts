import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
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

export async function uploadToCloudinary(
  file: Express.Multer.File,
  folder: string = "jbf"
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const isVideo = file.mimetype.startsWith("video/");
    const resourceType = isVideo ? "video" : "image";

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        transformation: isVideo
          ? undefined
          : [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error("Upload failed"));
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );

    stream.end(file.buffer);
  });
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: string = "image"
): Promise<void> {
  await cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}
