# api-produtos

API REST simples para gerenciamento de produtos — construída como exercício no curso Senai / Firjan.

## 🛠️ O que é este projeto

Este projeto implementa uma API básica para criação, leitura, atualização e deleção (CRUD) de produtos. A ideia é permitir que um cliente consuma os endpoints para gerenciar um catálogo de produtos de forma programática (via JSON/HTTP).

## 📁 Estrutura do projeto

- `server.js` — ponto de entrada da aplicação.  
- `routes/` — pasta com as rotas/endpoints da API.  
- `.env.example` — exemplo de configuração de variáveis de ambiente.  
- `db.json` — banco de dados em JSON (para simulação / persistência leve).  
- `package.json` / `package-lock.json` — dependências e scripts do Node.js.

## 🚀 Como executar localmente

1. Clone o repositório  
   ```bash
   git clone https://github.com/jackanilto/api-produtos.git
Acesse a pasta do projeto

bash
Copiar código
cd api-produtos
Instale as dependências

bash
Copiar código
npm install
Crie um arquivo .env baseado no .env.example (caso necessário).

Inicie o servidor

bash
Copiar código
npm start
A API estará disponível, por exemplo, em http://localhost:3000/ (dependendo da configuração).

📦 Endpoints disponíveis (exemplos)
Método	Rota	Descrição
GET	/produtos	Retorna todos os produtos
GET	/produtos/:id	Retorna produto por ID
POST	/produtos	Cria um novo produto
PUT	/produtos/:id	Atualiza produto existente
DELETE	/produtos/:id	Remove produto por ID

⚠️ Se a estrutura da sua API for diferente, ajuste as rotas conforme o código existente.

✨ Tecnologias usadas
Node.js

Express (presumido, se estiver usando)

JSON como banco de dados (via db.json) — ideal para protótipos ou demonstrações

🔧 Possíveis melhorias / planos futuros
Substituir o armazenamento por JSON por um banco real (SQL, NoSQL etc.).

Adicionar validações e tratamento de erros mais robusto.

Incluir documentação automática (ex: com Swagger / OpenAPI).

Adicionar testes automatizados.

Autenticação e controle de acesso (caso a API seja usada em produção).

📄 Licença
Este projeto está disponível sob a licença MIT — sinta-se livre para usar, modificar e distribuir.

🙏 Créditos
Desenvolvido por jackanilto como parte da Aula de API do Senai/Firjan.
