import express from "express";
import { getNgo } from "../controllers/ngos.js";
const router = express.Router();
router.get("/teste", getNgo);
export default router;