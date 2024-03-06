import express from "express";
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use("/api/users/", userRouter); //configurando rota principal dos users
app.use("/api/auth/", authRouter);

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000!");
});
