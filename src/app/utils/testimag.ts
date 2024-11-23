import { UploadCloudnary } from "./cloudinary.js";
const allimagens = [] as Express.Multer.File[];
const a = await UploadCloudnary(allimagens);
