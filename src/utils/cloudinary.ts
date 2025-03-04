import { v2 as cloudinary } from "cloudinary";
import { config as dotEnvConfig } from "dotenv";
import streamifier from "streamifier";

dotEnvConfig();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const getUrlCloudinary = (url: string) => {
  return cloudinary.url(url);
};

export const destroyImageCloudinary = (url: string) => {
  return cloudinary.uploader.destroy(url);
};

export const uploadToCloudinary = (
  buffer: string | Buffer<ArrayBufferLike> | Uint8Array<ArrayBufferLike>
) => {
  return new Promise((resolve, reject) => {
    // Pastikan buffer ada dan valid
    if (!buffer) {
      reject(new Error("No buffer to upload"));
      return;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "dump",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    // Tambahkan error handling untuk stream
    const stream = streamifier.createReadStream(buffer);
    stream.on("error", (error) => reject(error));

    stream.pipe(uploadStream);
  });
};
