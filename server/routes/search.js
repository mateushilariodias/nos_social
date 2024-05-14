import express from "express";
import { searchNgo, searchPost } from "../controllers/search.js";
import { getUser } from "../controllers/users.js";

const router = express.Router();

router.post("/search-ngos", getUser);
router.post("/search-posts", getUser);

export default router;