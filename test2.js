// import axios from "axios";
// import FormData from "form-data";
// import jwt from "jsonwebtoken";
// import fs from "fs";

// const form = new FormData();
// let controller = 0;
// const files = ["uploads/ajuda.png", "uploads/ajuda.png"];
// files.forEach((file) => {
//   if (file) {
//     controller++;
//     form.append(`imagem${controller}`, fs.createReadStream(file));
//   }
// });
// form.append("typeFolder", "img_product");
// const token = jwt.sign(
//   { app: "node-api" },
//   "$2b$10$5SSRVdotger0qAIrDxy1jOblB8wDCSRHQuXqr6NRE1FCn7FYnuFJW",
//   { expiresIn: "1h" }
// );
// const response = await axios.post(
//   "https://bgtech.com.br/erp/assets/assets-handler.php",
//   form,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       ...form.getHeaders(),
//     },
//   }
// );
// console.log(response.data);

// import { log } from "console";

// const a = undefined
// if(Number(a)) {
//   console.log('é valido');
// }
// else {
//   if(Number(a)) {
//     console.log("nan é um null ou undefined");

//   }
//   console.log(Number(a));

// }
// const value = "19909999";
// const regexphone = /^[0-9]{1,20}$/;
// const companyfilter = /^[A-Za-zÀ-ÿ\s]+$/;
// const valuePersona = "Lluc  é não  s";
// if (regexphone.test(value)) {
//   console.log("tem compatiblidade");
// }
// if (companyfilter.test(valuePersona)) {
//   console.log("tem compatiblidade também");
// }

function testquery(query) {
  return query.replace(/(lucas)/, (match, p1, p2, string) =>
    console.log(string)
  );
}
const stringg = "silva lucas";
const a = testquery(stringg);
console.log(a);
