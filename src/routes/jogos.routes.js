import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { jogos } from "../data/jogos.js";

const router = Router();

// Todas as rotas de jogos exigem token válido (Authorization: Bearer <token>)
router.use(authMiddleware);

/**
 * @swagger
 * /jogos:
 *   get:
 *     summary: Lista todos os jogos
 *     tags: [Jogos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de jogos
 *       401:
 *         description: Token não fornecido ou inválido
 */
router.get("/jogos", (req, res) => {
  res.json(jogos);
});

/**
 * @swagger
 * /jogos/{id}:
 *   get:
 *     summary: Consulta um jogo pelo id
 *     tags: [Jogos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jogo encontrado
 *       404:
 *         description: Jogo não encontrado
 */
router.get("/jogos/:id", (req, res) => {
  const id = Number(req.params.id);
  const jogo = jogos.find((jogo) => jogo.id === id);

  if (!jogo) {
    return res.status(404).json({ message: "Jogo não encontrado" });
  }

  res.json(jogo);
});

/**
 * @swagger
 * /jogos:
 *   post:
 *     summary: Cadastra um novo jogo
 *     tags: [Jogos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               genero:
 *                 type: string
 *               plataforma:
 *                 type: string
 *     responses:
 *       201:
 *         description: Jogo cadastrado com sucesso
 */
router.post("/jogos", (req, res) => {
  const novoJogo = {
    id: jogos.length + 1,
    titulo: req.body.titulo,
    genero: req.body.genero,
    plataforma: req.body.plataforma
  };

  jogos.push(novoJogo);

  res.status(201).json({
    mensagem: "Jogo cadastrado com sucesso",
    jogo: novoJogo
  });
});

/**
 * @swagger
 * /jogos/{id}:
 *   put:
 *     summary: Edita um jogo existente
 *     tags: [Jogos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               genero:
 *                 type: string
 *               plataforma:
 *                 type: string
 *     responses:
 *       200:
 *         description: Jogo atualizado
 *       404:
 *         description: Jogo não encontrado
 */
router.put("/jogos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { titulo, genero, plataforma } = req.body;

  const jogo = jogos.find((jogo) => jogo.id === id);

  if (!jogo) {
    return res.status(404).json({ message: "Jogo não encontrado" });
  }

  if (titulo) jogo.titulo = titulo;
  if (genero) jogo.genero = genero;
  if (plataforma) jogo.plataforma = plataforma;

  res.json(jogo);
});

/**
 * @swagger
 * /jogos/{id}:
 *   delete:
 *     summary: Remove um jogo
 *     tags: [Jogos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jogo removido com sucesso
 *       404:
 *         description: Jogo não encontrado
 */
router.delete("/jogos/:id", (req, res) => {
  const id = Number(req.params.id);
  const jogoIndex = jogos.findIndex((jogo) => jogo.id === id);

  if (jogoIndex === -1) {
    return res.status(404).json({ message: "Jogo não encontrado" });
  }

  jogos.splice(jogoIndex, 1);

  res.json({ message: "Jogo removido com sucesso" });
});

export default router;
