import fs from "fs";
import sharp from "sharp";
export class Sharp {
    static limpezaSharp(files, next) {
        let isError = {
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
                    }
                    else {
                        isError = {
                            mensagem: "foi possivel renomear o arquivo",
                            error: false,
                        };
                    }
                });
            }
            else {
                isError = {
                    mensagem: "arquivo não compativel, esperado somente arquivo png ou jpg",
                    error: true,
                };
            }
        });
        return isError;
    }
    static allImagens(files, order) {
        return order.map((boolean, index) => {
            if (boolean) {
                return files.find((f) => {
                    return f.originalname;
                });
            }
            else {
                return null;
            }
        });
    }
}