// Importação do módulo Express para lidar com rotas e criar o aplicativo.
import express from "express";

// Importação da função getUser do controlador de usuários.
import { getUser } from "../controllers/users.js";

// Criação de um objeto Router para definir rotas específicas.
const router = express.Router();

// Definição da rota "/teste" que aceita requisições GET e chama a função getUser do controlador de usuários.
router.get("/teste", getUser);

// Exportação do objeto Router para uso em outras partes do aplicativo.
export default router;