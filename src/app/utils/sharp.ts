// import fs from "fs";
// import sharp from "sharp";
// import { AllError } from "../error/AllError.js";
// export class SharpLimpeza {
//   static async ValidatationFiles(
//     files: Express.Multer.File[],
//     order: boolean[]
//   ): Promise<AllImagens> {
//     try {
//       files.forEach(async (files) => {
//         if (files.mimetype === "jpeg" || files.mimetype === "png") {
//           const path = files.path;
//           const outPutFilePath = `uploads/sanitized_${files.originalname}`;
//           await sharp(path).toFormat("png").toFile(outPutFilePath);
//           fs.rename(outPutFilePath, path, (err) => {
//             if (err) {
//               throw new AllError("não foi possivel sobrecrever a imagem", 500);
//             } else {
//               console.log(
//                 "foi possivel atulizar a imagem agora sanitizada e sem metadados e scripts maliciosos"
//               );
//             }
//           });
//         } else {
//           throw new AllError(
//             "formato inesperado de arquivo, envie somente jpeg ou png"
//           );
//         }
//       });
//       return order.map((boolean, index) => {
//         if (boolean) {
//           return files[index].filename;
//         } else {
//           return null;
//         }
//       });
//     } catch (error) {
//       throw error;
//     }
//   }
// }
import { NextFunction } from "express";
import fs from "fs";
import sharp from "sharp";
import { Files } from "../middleware/ClientValidator.js";

export class Sharp {
  static limpezaSharp(
    files: Express.Multer.File[],

    next: NextFunction
  ) {
    let isError: { mensagem: string; error: boolean } = {
      mensagem: "sem error",
      error: false,
    };
    files.forEach(async (file) => {
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        const path = file.path;
        const outputpathfile = `uploads/sanitized_${file.filename}`;
        await sharp(path).toFormat("png").toFile(outputpathfile);
        fs.rename(outputpathfile, path, (err) => {
          if (err) {
            isError = {
              mensagem: "não foi possivel renomear o arquivo",
              error: true,
            };
          } else {
            isError = {
              mensagem: "foi possivel renomear o arquivo",
              error: false,
            };
          }
        });
      } else {
        isError = {
          mensagem:
            "arquivo não compativel, esperado somente arquivo png ou jpg",
          error: true,
        };
      }
    });
    return isError;
  }
  static allImagens(files: Express.Multer.File[], order: boolean[]) {
    return order.map((boolean, index) => {
      if (boolean) {
        return files.find((f) => {
          return f.originalname;
        });
      } else {
        return null;
      }
    });
  }
}
