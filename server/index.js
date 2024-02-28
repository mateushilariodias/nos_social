import express from "express";

const app = express();

app.listen(8001, () => {
    console.log("Servidor rodando na porta 8001!");
});