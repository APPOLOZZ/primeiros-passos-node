# API de Jogos — AV2

API Express com cadastro de usuários, login, autenticação por token (JWT), CRUD de jogos protegido, upload de imagem com validação e documentação via Swagger.

## Como rodar

1. Instale as dependências:
   ```
   npm install
   ```
2. Copie o `.env.example` para `.env` e defina um `JWT_SECRET`:
   ```
   cp .env.example .env
   ```
3. Rode o servidor:
   ```
   npm run dev
   ```
4. Acesse a documentação em: http://localhost:3000/api-docs

## Fluxo de uso

1. **Cadastrar usuário** — `POST /usuarios`
   ```json
   { "nome": "Maria", "email": "maria@email.com", "senha": "123456" }
   ```
2. **Login** — `POST /login` (retorna um `token`)
   ```json
   { "email": "maria@email.com", "senha": "123456" }
   ```
3. **Usar o token nas rotas de jogos** — em toda requisição para `/jogos`, adicione o header:
   ```
   Authorization: Bearer <token recebido no login>
   ```
4. **Upload de imagem** — `POST /upload`, com `form-data`, campo `imagem` do tipo arquivo. Aceita apenas png/jpg/jpeg/webp, até 5MB.

## Rotas

| Método | Rota          | Protegida? |
|--------|---------------|------------|
| POST   | /usuarios     | Não |
| POST   | /login        | Não |
| GET    | /jogos        | Sim |
| GET    | /jogos/:id    | Sim |
| POST   | /jogos        | Sim |
| PUT    | /jogos/:id    | Sim |
| DELETE | /jogos/:id    | Sim |
| POST   | /upload       | Não |
| GET    | /api-docs     | Não |

## Estrutura

```
app.js
src/
  routes/        rotas da API
  middlewares/    autenticação (JWT) e upload (multer)
  data/          "banco de dados" em memória
  docs/          configuração do Swagger
uploads/         imagens enviadas
```
