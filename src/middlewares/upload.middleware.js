import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.resolve("uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extensao = path.extname(file.originalname);
    cb(null, `${timestamp}${extensao}`);
  }
});

const tiposPermitidos = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const tamanhoMaximo = 5 * 1024 * 1024; // 5MB

const fileFilter = (req, file, cb) => {
  if (!tiposPermitidos.includes(file.mimetype)) {
    return cb(new Error("Tipo de arquivo não permitido. Envie apenas imagens (png, jpg, jpeg, webp)."));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: tamanhoMaximo }
});

export default upload;
