import { JwtToken } from "../utils/Jwt.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { Sharp } from "../utils/sharp.js";
interface uploadRemove {}
interface returnApiPhp {
  url: string;
}
export const ApiPhp = async (filepath: {
  filePath: (string | null)[];
  typeFolder: "img_product" | "img_profile";
  files: Express.Multer.File[];
}): Promise<returnApiPhp[] | { message: string }> => {
  try {
    const formdata = new FormData();
    filepath.filePath.forEach((file, index) => {
      if (file) {
        formdata.append(`image ${index}`, fs.createReadStream(file));
      }
    });
    formdata.append("typeFolder", filepath.typeFolder);

    const token = JwtToken.getTokenApi({ app: "node-api" }, "api", {
      expiresIn: "15min",
    });
    const response = await axios.post(
      "https://bgtech.com.br/erp/assets/assets-handler.php",
      formdata,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          ...formdata.getHeaders(),
        },
      }
    );
    const data: returnApiPhp[] | { message: string } = response.data;

    const { mensagem, error } = await Sharp.removeImagens(filepath.files);
    console.log(mensagem);
    return data;
  } catch (error) {
    throw error;
  }
};
export const deleteUpload = async (arrayImagens: (string | null)[]) => {
  const token = JwtToken.getTokenApi({ app: "node-api" }, "api", {
    expiresIn: "15min",
  });
  const response = await axios.delete(
    "https://bgtech.com.br/erp/assets/assets-handler.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { paths: arrayImagens },
    }
  );
  const data = response.data;
  return data;
};
