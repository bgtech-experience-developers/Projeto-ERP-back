import { date } from "joi";
import multer from "multer";

export class UploadFile {
  static Upload(): multer.Multer {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads"); //local para o armazenamnto do upload da imagem
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });
    return multer({ storage });
  }

  static uploadSingle(): multer.Multer {
    const storage = multer.diskStorage({
      destination:  (req, file, callback) => {
          callback(null, "uploads")
      },
      filename: (req, file, callback) => {
          callback(null, Date.now() + "-" + file.originalname)
      }
  })

  return multer({storage})
  }
} //definir a configuração inicial
