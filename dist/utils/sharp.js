import fs from "fs";
import sharp from "sharp";
import path from "path";
export class Sharp {
    static limpezaSharp(files, next) {
        const messagmns = files.map(async (file) => {
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
                    }
                    else {
                        return {
                            mesagem: "foi carregado com sucesso",
                            error: false,
                        };
                    }
                });
            }
            else {
                return {
                    mesagem: "arquivo não compativel, esperado somente arquivo png ou jpg",
                    error: true,
                };
            }
            return { mesagem: "tudo normal", error: false };
        });
        return Promise.all(messagmns);
    }
    static async removeImagens(files) {
        try {
            let mensagem = {
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
                    }
                    else {
                    }
                });
            });
            return mensagem;
        }
        catch (error) {
            throw error;
        }
    }
    static allImagens(files, order) {
        const size = order.length - files.length;
        return order.map((boolean, index) => {
            if (boolean && files[index]) {
                console.log(files[index]);
                const url = files[index].path;
                return url;
            }
            else {
                return null;
            }
        });
    }
}
