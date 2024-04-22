// Importação do módulo express
import express from "express";

// Importação dos controladores para manipular as rotas de postagem
import { creatPost, getPost } from "../controllers/post.js";

// Criação de um novo objeto Router do Express
const router = express.Router()

// Definição das rotas para manipulação de postagens
// Rota para criar uma nova postagem usando o método POST
router.post("/", creatPost)

// Rota para obter todas as postagens usando o método GET
router.get("/", getPost)

// Exportação do objeto router para uso em outros arquivos
export default router;
