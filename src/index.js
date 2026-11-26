const express = require('express');
const path = require("path");
const cors = require('cors');

const db = require("./database");
const routes = require("./routes");

const app = express();

app.use(cors());

// Definindo o template EJS com caminho absoluto seguro para a Vercel
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

// Middleware para o server receber os dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Arquivos públicos (CSS e JS dentro de src/public)
app.use(express.static(path.join(process.cwd(), "src", "public")));

// Garante conexão com o banco antes de processar as rotas na Vercel
app.use(async (req, res, next) => {
  await db.connect();
  next();
});

// Rotas
app.use("/", routes);

// Executa localmente, mas na Vercel apenas exporta o app
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
}

module.exports = app;
