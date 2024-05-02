// Importação do módulo Express para lidar com rotas e criar o aplicativo.
import express from "express";

// Importação das funções de registro e login do controlador de autenticação.
import { registerUser, loginUser, refresh, logout, registerNgo } from "../controllers/auth.js";
import { checkRefreshToken } from "../middleware/refreshTokenValidation.js";
import { checkToken } from "../middleware/tokenValidation.js";

// Criação de um objeto Router para definir rotas específicas.
const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/logout", checkToken, logout);
router.get("/refresh", checkRefreshToken, refresh);
router.post("/registerNgo", registerNgo);

export default router;