📦 API-Produtos

API REST para gerenciamento simples de produtos.
Feita em Node.js + Fastify, utilizando um arquivo JSON como armazenamento.

🔰 1. Como criar este projeto do zero

Este guia mostra exatamente como você pode recriar o projeto do zero, caso queira repetir o processo.

📌 1.1 Criar a pasta do projeto
mkdir api-produtos
cd api-produtos

📌 1.2 Iniciar o Node.js
npm init -y


Isso criará o arquivo package.json.

📌 1.3 Instalar dependências necessárias
npm install fastify @fastify/cors @fastify/swagger @fastify/swagger-ui dotenv uuid


E o nodemon (somente para desenvolvimento):

npm install nodemon -D

📌 1.4 Criar a estrutura básica
/api-produtos
 ├─ server.js
 ├─ routes/
 │   └─ produtos.js
 ├─ db.json
 ├─ .env
 └─ package.json

📌 1.5 Criar o arquivo db.json
[]

📌 1.6 Criar o servidor (server.js)
import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { produtosRoutes } from "./routes/produtos.js";
import fs from "fs";

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(cors);

// Carregar o DB JSON
let produtos = JSON.parse(fs.readFileSync("./db.json", "utf8"));

// Função para salvar no "banco"
function saveToDB() {
  fs.writeFileSync("./db.json", JSON.stringify(produtos, null, 2));
}

// Rotas
fastify.register(produtosRoutes, { prefix: "/produtos", produtos, saveToDB });

// Porta
const PORT = process.env.PORT || 3000;

fastify.listen({ port: PORT }, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

📌 1.7 Criar as rotas (routes/produtos.js)
import { v4 } from "uuid";

export async function produtosRoutes(fastify, opts) {
  const { produtos, saveToDB } = opts;

  // Listar todos
  fastify.get("/", () => produtos);

  // Buscar por ID
  fastify.get("/:id", (req, reply) => {
    const produto = produtos.find((p) => p.id === req.params.id);

    if (!produto)
      return reply.code(404).send({ error: "Produto não encontrado" });

    return produto;
  });

  // Criar
  fastify.post("/", (req, reply) => {
    const novoProduto = { id: v4(), ...req.body };

    // Validação simples
    if (novoProduto.preco <= 0) {
      return reply.code(400).send({ error: "Preço inválido!" });
    }

    produtos.push(novoProduto);
    saveToDB();

    reply.code(201).send(novoProduto);
  });

  // Atualizar (PUT)
  fastify.put("/:id", (req, reply) => {
    const i = produtos.findIndex((p) => p.id === req.params.id);
    if (i === -1)
      return reply.code(404).send({ error: "Produto não encontrado" });

    produtos[i] = { id: req.params.id, ...req.body };
    saveToDB();

    reply.send(produtos[i]);
  });

  // Atualização parcial (PATCH)
  fastify.patch("/:id", (req, reply) => {
    const produto = produtos.find((p) => p.id === req.params.id);
    if (!produto)
      return reply.code(404).send({ error: "Produto não encontrado" });

    Object.assign(produto, req.body);
    saveToDB();

    reply.send(produto);
  });

  // Deletar
  fastify.delete("/:id", (req, reply) => {
    const i = produtos.findIndex((p) => p.id === req.params.id);
    if (i === -1)
      return reply.code(404).send({ error: "Produto não encontrado" });

    produtos.splice(i, 1);
    saveToDB();

    reply.send({ message: "Produto removido" });
  });
}

📌 1.8 Ajustar o package.json
"scripts": {
  "dev": "nodemon server.js",
  "start": "node server.js"
}


Agora você roda o servidor com:

npm run dev

🚀 2. Como rodar este repositório

Se você clonou o repositório, basta:

git clone https://github.com/jackanilto/api-produtos
cd api-produtos
npm install
npm run dev


API disponível em:

http://localhost:3000/produtos

📚 3. Endpoints da API
✔ GET /produtos

Retorna todos os produtos.

✔ GET /produtos/:id

Retorna um produto via ID.

✔ POST /produtos

Cria um novo produto.
Exemplo:

{
  "nome": "Mouse Gamer",
  "preco": 150,
  "estoque": 30
}

✔ PUT /produtos/:id

Atualiza todos os dados de um produto.

✔ PATCH /produtos/:id

Atualiza apenas um campo.

✔ DELETE /produtos/:id

Remove um produto.

🛠 Tecnologias utilizadas

Node.js

Fastify

CORS

UUID

Persistência local com JSON

Dotenv

✨ Melhorias futuras

Banco de dados real (SQLite, PostgreSQL, MongoDB etc.)

Autenticação JWT

Testes automatizados

Frontend integrado

Swagger para documentação
