// Importação do módulo Express para lidar com rotas e criar o aplicativo.
import express from "express";

// Importação das funções de registro e login do controlador de autenticação.
import { registerUser, loginUser, refresh, registerNgo } from "../controllers/auth.js";

// Criação de um objeto Router para definir rotas específicas.
const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/refresh", refresh);
router.post("/registerNgo", registerNgo);

export default router;