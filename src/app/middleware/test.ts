import { ApiPhpUtils } from "../utils/ApiPhp.js";
import { ApiPhp } from "./ApiPhp.js";
import { JwtToken } from "../utils/Jwt.js";
import jwt from "jsonwebtoken";
const test = async () => {
  const token = jwt.sign(
    { app: "node-api" },
    "$2b$10$5SSRVdotger0qAIrDxy1jOblB8wDCSRHQuXqr6NRE1FCn7FYnuFJW",
    {
      expiresIn: "1h",
    }
  );

  const response = fetch(
    "https://bgtech.com.br/erp/assets/assets-handler.php",
    {
      method: "Post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        filePath: "uploads\\1732744770742-ajuda.png",
        typeFile: "profile",
      }),
    }
  );
  const data: Promise<string[]> = (await response).json();

  const value = await data;
  console.log(value);
};
test();
