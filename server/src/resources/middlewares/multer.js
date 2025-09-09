import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/public/img/");
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname.replace(/\s+/g, "_");
        cb(null, Date.now() + "-" + originalName);
    },
});

const upload = multer({ storage });

export default upload;