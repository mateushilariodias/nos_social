// Importação do módulo Express para lidar com rotas e criar o aplicativo.
import express from "express";

// Importação das funções de registro e login do controlador de autenticação.
import { registerUser } from "../controllers/auth.js";
import { loginUser } from "../controllers/auth.js";
import { registerNgo } from "../controllers/auth.js";

// Criação de um objeto Router para definir rotas específicas.
const router = express.Router();

// Definição da rota de registro ("/register") que aceita requisições POST e chama a função register do controlador.
router.post("/registerUser", registerUser);

// Definição da rota de login ("/login") que aceita requisições POST e chama a função login do controlador.
router.post("/loginUser", loginUser);
// router.post("/refrech", refrech);

router.post("/registerNgo", registerNgo);

// Exportação do objeto Router para uso em outras partes do aplicativo.
export default router;