import express from "express";
import { searchNgo, searchPost } from "../controllers/search.js";

const router = express.Router();

router.post("/search-ngos", searchNgo);
router.post("/search-posts", searchPost);

export default router;