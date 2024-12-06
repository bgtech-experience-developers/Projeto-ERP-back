import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";
import { AllError } from "../error/AllError.js";
import { number } from "joi";

interface deleted {
  deleted: {
    [key: string]: "deleted" | "not found";
  };
}
export const UploadCloudnary = async (files: Express.Multer.File[]) => {
  try {
    const regex = /[\b.png\b.jpg/]/gi;
    const configCloudinary = cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const upload = files.map((file) => {
      console.log(file);
      return cloudinary.uploader.upload(file.path, {
        folder: "client",
        public_id: `erp/${file.originalname.replace(regex, "")}`,
      });
    });

    return await Promise.all(upload);
  } catch (error) {
    throw error;
  }
};
export async function DeleteResourcesCloud(
  public_id: string
): Promise<{ result: string }>;
export async function DeleteResourcesCloud(
  public_id: string[]
): Promise<deleted>;
export async function DeleteResourcesCloud(
  public_id: string | string[]
): Promise<deleted | { result: string }> {
  try {
    if (public_id instanceof Array) {
      const deleted: deleted = await cloudinary.api.delete_resources(public_id);
      return deleted;
    } else {
      const result: { result: string } = await cloudinary.uploader.destroy(
        public_id
      );
      return result;
    }
  } catch (error) {
    throw error;
  }
}
