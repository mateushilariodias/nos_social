import express from "express";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import bodyParser from "body-parser";

const app = express();

app.use(express.json); //Entender o formato .json
app.use(bodyParser.urlencoded({extend: false}));

app.use("/server/users/", userRouter); //configurando rota principal dos users
app.use("/server/auth/", authRouter);

app.listen(8001, () => {
    console.log("Servidor rodando na porta 8001!");
});