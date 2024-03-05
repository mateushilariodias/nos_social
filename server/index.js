import express from "express";
import userRouter from "./routes/user.js"

const app = express();

app.use("/api/users/", userRouter); //configurando rota principal dos users

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000!");
});
