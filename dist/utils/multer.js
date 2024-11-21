import multer from "multer";
export class UploadFile {
    static Upload() {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "uploads");
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + "-" + file.originalname);
            },
        });
        return multer({ storage });
    }
} //definir a configuração inicial
