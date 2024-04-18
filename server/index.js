// Importação dos módulos necessários do Express.js para criar o aplicativo e configurar rotas.
import express from "express";
import bodyParser from "body-parser"; // Body parser é usado para analisar corpos de requisição HTTP em middleware.
// Importação dos roteadores de usuário e autenticação.
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";

// Criação do aplicativo Express.
const app = express();
const corsOpitions = {
    origin: "http://nos-social.cb6uawesoga1.sa-east-1.rds.amazonaws.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Credentials"
    ]
}


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOpitions));
app.use(cookieParser());

// Configuração das rotas para os roteadores de usuário e autenticação.
app.use("/server/users/", userRouter); // Configurando rota principal dos usuários.
app.use("/server/auth/", authRouter);   // Configurando rota principal da autenticação.
app.use("/server/post/", postRouter); // Configurar rota principal dos posts
// Inicialização do servidor na porta 3306.
app.listen(3306, () => {
    console.log("Servidor rodando na porta 3306!");
});