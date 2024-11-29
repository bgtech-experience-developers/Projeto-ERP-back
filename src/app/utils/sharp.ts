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
import { UploadCloudnary } from "./cloudinary.js";
import { Files } from "../middleware/ClientValidator.js";
import path from "path";
import { AllError } from "../error/AllError.js";
import { manualSync } from "rimraf";

export class Sharp {
  static limpezaSharp(
    files: Express.Multer.File[],

    next: NextFunction
  ) {
    const messagmns = files.map(
      async (file): Promise<{ mesagem: string; error: boolean }> => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
          const path = file.path;

          const outputpathfile = `uploads/sanitized_${file.filename}`;
          await sharp(path).toFile(outputpathfile);
          fs.rename(outputpathfile, path, (err) => {
            if (err) {
              return {
                mesagem: "não foi possivel renomear o arquivo",
                error: true,
              };
            } else {
              return {
                mesagem: "foi carregado com sucesso",
                error: false,
              };
            }
          });
        } else {
          return {
            mesagem:
              "arquivo não compativel, esperado somente arquivo png ou jpg",
            error: true,
          };
        }
        return { mesagem: "tudo normal", error: false };
      }
    );

    return Promise.all(messagmns);
  }
  static async removeImagens(files: Express.Multer.File[]) {
    try {
      let mensagem: { mensagem: string; error: boolean } = {
        mensagem: "",
        error: false,
      };
      const regex = /[\\]/gi;
      files.forEach((file) => {
        const diretorio = "uploads";
        const filename = file.filename;

        const pathFile = path.join(diretorio, filename).replace(regex, "/");

        fs.unlink(pathFile, (err) => {
          if (err) {
            mensagem = {
              mensagem: "não foi possivl remover o arquivo",
              error: true,
            };
          } else {
          }
        });
      });
      return mensagem;
    } catch (error) {
      throw error;
    }
  }
  static allImagens(files: Express.Multer.File[], order: boolean[]) {
    const size = order.length - files.length;
    let controller = 0;
    return order.map((boolean, index) => {
      if (boolean && files[controller]) {
        const url = files[controller].path;
        controller++;

        return url;
      } else {
        return null;
      }
    });
  }
}
