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
// import dotnev from "dotenv";
// dotnev.config();
// import { v2 as cloud } from "cloudinary";
// const configCloudinary = cloud.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// const url =
//   "https://res.cloudinary.com/dgl61q8hs/image/upload/v1732388934/client/mdcjnillguco2tpdwpkf.png";
// const index = url.indexOf("/client");
// const url2 = url.slice(index);
// console.log(url2);
// console.log(index);
// const result = await cloud.uploader.destroy(
//   "client/erp/c5c2009150c07359f096d342f9c4e1ec"
// );
// console.log(result);
// const ab = "c5c2009150c07359f096d342f9c4e1ec.jpg";
// const regex = /[\b.png\b.jg/]/gi;

// const trocar = ab.replace(regex, "");
// console.log(trocar);

// const file = ["caminho", null, null, "lucas"];
// const imagens = file.map((imagem) => {
//   return imagem.path ? imagem.path : null;
// });
// console.log(imagens);
// if (imagens.length != 0) {
//   console.log("ola mundo");
// }
// const apiPhp = file.filter((file) => {
//   return file ? file : null;
// });
// console.log(apiPhp);
// const arrayNovo = ["path", "name"];
// let controle = 0;
// file.forEach((value, index) => {
//   console.log(value);
//   value ? ((file[index] = arrayNovo[controle]), controle++) : "";
// });
// console.log(file);
