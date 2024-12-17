import { JwtToken } from "../utils/Jwt.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { Sharp } from "../utils/sharp.js";
interface uploadRemove {}
interface returnApiPhp {
  url: string;
}
export const ApiPhp = async (filepath: { filePath: (string | null)[]; typeFolder: "img_product" | "img_profile"; files: Express.Multer.File[];
}): Promise<returnApiPhp[] | { message: string }> => {
  try {
    const formdata = new FormData();
    console.log(filepath.filePath);
    
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

export const deleteApiPhp = async (filePath: (string | null)[]) => {
  const token = JwtToken.getTokenApi({ app: "node-api" }, "api", {
    expiresIn: "5m",
  });

  // const formData = new FormData();
  // formData. append('action', filePath.action);
  // formData.append('paths', JSON.stringify(filePath.paths));
  // filePath.paths.forEach((path) => {
  //   if(path) {
  //     formData.append('paths', path)
  //   }

  // })

  const response = await axios.delete(
    "https://bgtech.com.br/erp/assets/assets-handler.php",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        // ...formData.getHeaders()
      },
      data: { paths: filePath },
    }
  );

  const data = response.data;
  console.log(data);
};
