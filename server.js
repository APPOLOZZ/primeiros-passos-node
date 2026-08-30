import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const jogos = [
  { id: 1, titulo: "The Legend of Zelda: Breath of the Wild", genero: "Aventura", plataforma: "Switch" },
  { id: 2, titulo: "God of War Ragnarök", genero: "Ação", plataforma: "PS5" },
  { id: 3, titulo: "Elden Ring", genero: "RPG", plataforma: "PC" },
  { id: 4, titulo: "Minecraft", genero: "Sandbox", plataforma: "Multiplataforma" },
  { id: 5, titulo: "FIFA 24", genero: "Esporte", plataforma: "PS5" },
  { id: 6, titulo: "Hollow Knight", genero: "Metroidvania", plataforma: "PC" },
  { id: 7, titulo: "Red Dead Redemption 2", genero: "Ação", plataforma: "Xbox" },
  { id: 8, titulo: "Stardew Valley", genero: "Simulação", plataforma: "Multiplataforma" }
];

app.get("/", (req, res) => {
  res.json({
    mensagem: "Servidor Express funcionando!",
    disciplina: "Desenvolvimento de Websites",
    bimestre: "3º bimestre"
  });
});

app.get("/jogos", (req, res) => {
  res.json(jogos);
});

app.get("/jogos/:id", (req, res) => {
  const id = Number(req.params.id);

  const jogo = jogos.find((jogo) => jogo.id === id);

  if (!jogo) {
    return res.status(404).json({
      message: "Jogo não encontrado"
    });
  }

  res.json(jogo);
});

app.post("/jogos", (req, res) => {
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

app.put("/jogos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { titulo, genero, plataforma } = req.body;

  const jogo = jogos.find((jogo) => jogo.id === id);

  if (!jogo) {
    return res.status(404).json({
      message: "Jogo não encontrado"
    });
  }

  if (titulo) {
    jogo.titulo = titulo;
  }

  if (genero) {
    jogo.genero = genero;
  }

  if (plataforma) {
    jogo.plataforma = plataforma;
  }

  res.json(jogo);
});

app.delete("/jogos/:id", (req, res) => {
  const id = Number(req.params.id);

  const jogoIndex = jogos.findIndex((jogo) => jogo.id === id);

  if (jogoIndex === -1) {
    return res.status(404).json({
      message: "Jogo não encontrado"
    });
  }

  jogos.splice(jogoIndex, 1);

  res.json({
    message: "Jogo removido com sucesso"
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});