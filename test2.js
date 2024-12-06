import axios from "axios";
import FormData from "form-data";
import jwt from "jsonwebtoken";
import fs from "fs";
const form = new FormData();
let controller = 0;
const files = ["uploads/ajuda.png", "uploads/ajuda.png"];
files.forEach((file) => {
  if (file) {
    controller++;
    form.append(`imagem${controller}`, fs.createReadStream(file));
  }
});
form.append("typeFolder", "img_product");
const token = jwt.sign(
  { app: "node-api" },
  "$2b$10$5SSRVdotger0qAIrDxy1jOblB8wDCSRHQuXqr6NRE1FCn7FYnuFJW",
  { expiresIn: "1h" }
);
const response = await axios.post(
  "https://bgtech.com.br/erp/assets/assets-handler.php",
  form,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      ...form.getHeaders(),
    },
  }
);
console.log(response.data);