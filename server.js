import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { configDotenv } from "dotenv";
import Fastify from "fastify";
import fs from "fs";
import { produtosRoutes } from "./routes/produtos.js";

configDotenv();

const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
const produtos = db.produtos || [];

function saveToDB() {
    fs.writeFileSync(
        "./db.json",
        JSON.stringify({ produtos }, null, 4),
        "utf-8"
    );
}

const fastify = Fastify({ logger: true });

fastify.register(cors, { origin: "*" });

fastify.register(fastifySwagger, {
    swagger: {
        info: {
            title: "Produtos API",
            description: "Documentação da API de Produtos",
            version: "1.0.0",
        },
        host: "localhost:3000",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
    },
});

fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    exposeRoute: true,
});

fastify.register(produtosRoutes, {
    prefix: "/produtos",
    produtos,
    saveToDB,
});

fastify.listen({ port: process.env.PORT ?? 3000 })
    .then((address) => {
        console.log(`🚀 Server Running: ${address}`);
        console.log(`📘 Swagger Docs: ${address}/docs`);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
