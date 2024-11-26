import { v2 as cloudinary } from "cloudinary";
export const UploadCloudnary = async (files) => {
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
    }
    catch (error) {
        throw error;
    }
};
export async function DeleteResourcesCloud(public_id) {
    try {
        if (public_id instanceof Array) {
            const deleted = await cloudinary.api.delete_resources(public_id);
            return deleted;
        }
        else {
            const result = await cloudinary.uploader.destroy(public_id);
            return result;
        }
    }
    catch (error) {
        throw error;
    }
}
