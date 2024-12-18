import { deleteUpload } from "./dist/middleware/ApiPhp.js";
import dotenv from "dotenv";
dotenv.config();
await deleteUpload(["img_profile/173449169067.png"]);
