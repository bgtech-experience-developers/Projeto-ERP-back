// const texto = new TextEncoder().encode("lucaskkkk");
import fs from "fs";
import path from "path";
// const a = texto.buffer;
// const buffer = texto.buffer;
// const end = new TextDecoder();
// const textdecodr = end.decode(a);
// console.log(textdecodr);

// const pathFileA = "sereiremovido.jpg";
// const diretorio = "uploads/client";
// const allfile = path.join(diretorio, pathFileA);
// fs.unlink(allfile, (err) => {
//   if (err) {
//     console.log("não foi possivl remover o arquivo");
//   } else {
//     console.log("foi possivl rmeover o arquivo");
//   }
// });
// const arquivos = ["uploads/1732379626299-acesso hasghtag.png"];

// function a(arquivos) {
//   try {
//     const upload = arquivos.forEach((string) => {
//       fs.unlink(string, (err) => {
//         if (err) {
//           console.log(err);
//           throw new Error(
//             "eu to lançando uma exeção internamente dentro de um map"
//           );
//         } else {
//           console.log("tudo certo");
//         }
//       });
//     });
//   } catch (error) {
//     console.error(error.message);
//   }
// }
// a(arquivos)
import dotnev from "dotenv";
dotnev.config();
import { v2 as cloud } from "cloudinary";
const configCloudinary = cloud.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const result = await cloud.api.delete_resources(
//   ["client/erp/softhouse-loo", "client/erp/OKEMOe"],
//   (err, resul) => {
//     if (err) {
//       console.log("o erro foi: ", err);
//     }
//     console.log(resul);
//   }
// );
const result = await cloud.api.delete_resources();
console.log("todo o resultado ", result);
// const ab = "c5c2009150c07359f096d342f9c4e.jpg1ec.png";
// const regex = /(\.png|\.jpg)$/gi;

// const trocar = ab.replace(regex, "");
// console.log(trocar);
