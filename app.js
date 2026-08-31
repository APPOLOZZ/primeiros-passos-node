import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger.js";
import usuariosRoutes from "./src/routes/usuarios.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import jogosRoutes from "./src/routes/jogos.routes.js";
import uploadRoutes from "./src/routes/upload.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    mensagem: "Servidor Express funcionando!",
    disciplina: "Desenvolvimento de Websites",
    bimestre: "3º bimestre"
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(usuariosRoutes);
app.use(authRoutes);
app.use(jogosRoutes);
app.use(uploadRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação disponível em http://localhost:${port}/api-docs`);
});
