import multer from "multer";
import path from "path";
import  fs from "fs";


const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath , {recursive: true});
}
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, uploadPath);
    },
    filename(req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },

})

const fileFilter = (req: any, file: Express.Multer.File, callback: any) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("Only jpeg, jpg, and png are allowed"),false);
    }
}

export const upload = multer({storage, fileFilter});