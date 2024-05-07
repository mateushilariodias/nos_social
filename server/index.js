// Importação dos módulos necessários do Express.js para criar o aplicativo e configurar rotas.
import express from "express";
// Importação dos roteadores de usuário e autenticação.
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import commentRouter from "./routes/comment.js";
import uploadRouter from "./routes/upload.js";
import bodyParser from "body-parser";
import cors from "cors";

import cookieParser from "cookie-parser";

// Criação do aplicativo Express.
const app = express();

const corsOptions = {
    origin: "http://nos-social.cb6uawesoga1.sa-east-1.rds.amazonaws.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Credentials"
    ]
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());

// Configuração das rotas para os roteadores de usuário e autenticação.
app.use("/server/users/", userRouter); // Configurando rota principal dos usuários.
app.use("/server/auth/", authRouter);   // Configurando rota principal da autenticação.
app.use("/server/posts/", postRouter); // Configurar rota principal dos posts
app.use("/server/comment/", commentRouter); 
app.use("/server/upload/", uploadRouter); 

// Inicialização do servidor na porta 3306.
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3306!");
});