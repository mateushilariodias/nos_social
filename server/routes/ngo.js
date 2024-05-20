import express from "express";
import { getNgo, updateNgo } from "../controllers/ngos.js";
import { checkToken } from "../middleware/tokenValidation.js";

const router = express.Router();

router.get("/get-ngo", getNgo);
router.get("/update-ngo", checkToken, updateNgo);

export default router;