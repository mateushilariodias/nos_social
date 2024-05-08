import express from "express";
import { addLikes, getLikes, deletelikes } from "../controllers/likes.js";
import { checkToken } from "../middleware/tokenValidation.js";

const router = express.Router();

router.post("/", checkToken, addLikes);
router.get("/", checkToken, getLikes);
router.delete("/", checkToken, deletelikes);

export default router;