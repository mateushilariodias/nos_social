import express from "express";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import bodyParser from "body-parser";

const app = express();

app.use(express.json);
app.use(bodyParser.urlencoded({extend: false}));

app.use("/api/users/", userRouter); //configurando rota principal dos users
app.use("/api/auth/", authRouter);

app.listen(8001, () => {
    console.log("Servidor rodando na porta 8001!");
});
