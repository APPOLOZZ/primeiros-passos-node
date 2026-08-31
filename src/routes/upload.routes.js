import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";

const router = Router();

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Envia uma imagem e salva na pasta local de uploads
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Upload realizado com sucesso
 *       400:
 *         description: Arquivo inválido, tipo não permitido ou tamanho excedido
 */
router.post("/upload", (req, res) => {
  upload.single("imagem")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado" });
    }

    res.status(201).json({
      mensagem: "Upload realizado com sucesso",
      arquivo: {
        nome: req.file.filename,
        tamanho: req.file.size,
        tipo: req.file.mimetype
      }
    });
  });
});

export default router;
