// Importação dos módulos necessários do Express.js para criar o aplicativo e configurar rotas.
import express from "express";
import bodyParser from "body-parser"; // Body parser é usado para analisar corpos de requisição HTTP em middleware.

// Importação dos roteadores de usuário e autenticação.
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";

// Criação do aplicativo Express.
const app = express();

// Middleware para permitir que o Express entenda o formato JSON.
app.use(express.json());

// Middleware para analisar corpos de requisição codificados em URL.
app.use(bodyParser.urlencoded({ extended: false }));

// Configuração das rotas para os roteadores de usuário e autenticação.
app.use("/server/users/", userRouter); // Configurando rota principal dos usuários.
app.use("/server/auth/", authRouter);   // Configurando rota principal da autenticação.

// Inicialização do servidor na porta 8001.
app.listen(8001, () => {
    console.log("Servidor rodando na porta 8001!");
});