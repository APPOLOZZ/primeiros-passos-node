import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usuarios } from "../data/usuarios.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login e retorna um token de acesso (crachá digital)
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso, retorna o token
 *       400:
 *         description: Dados obrigatórios não enviados
 *       401:
 *         description: Email ou senha incorretos
 */
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  const usuario = usuarios.find((usuario) => usuario.email === email);

  if (!usuario) {
    return res.status(401).json({ message: "Email ou senha incorretos" });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return res.status(401).json({ message: "Email ou senha incorretos" });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    mensagem: "Login realizado com sucesso",
    token
  });
});

export default router;
