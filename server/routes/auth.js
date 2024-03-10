// Importação do módulo Express para lidar com rotas e criar o aplicativo.
import express from "express";

// Importação das funções de registro e login do controlador de autenticação.
import { register } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";

// Criação de um objeto Router para definir rotas específicas.
const router = express.Router();

// Definição da rota de registro ("/register") que aceita requisições POST e chama a função register do controlador.
router.post("/register", register);

// Definição da rota de login ("/login") que aceita requisições POST e chama a função login do controlador.
router.post("/login", login);

// Exportação do objeto Router para uso em outras partes do aplicativo.
export default router;