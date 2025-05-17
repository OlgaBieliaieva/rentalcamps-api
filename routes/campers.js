import express from "express";
import { getCampers } from "../controllers/campersController.js";

const router = express.Router();

router.get("/", getCampers);

export default router;
