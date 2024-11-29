import { JwtToken } from "../utils/Jwt.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { Sharp } from "../utils/sharp.js";
interface returnApiPhp {
  url: string;
}
export const ApiPhp = async (filepath: {
  filePath: (string | null)[];
  typeFolder: "img_product" | "img_profile";
  files: Express.Multer.File[];
  action : 'POST' | 'DELETE'
}, ): Promise<returnApiPhp[] | { message: string }> => {
  try {
    const formdata = new FormData();
    filepath.filePath.forEach((file, index) => {
      if (file) {
        formdata.append(`image ${index}`, fs.createReadStream(file));
      }
    });
    formdata.append("typeFolder", filepath.typeFolder);
    formdata.append("action",filepath.action)

    const token = JwtToken.getTokenApi({ app: "node-api" }, "api", {
      expiresIn: "1h",
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
