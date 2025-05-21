import express from "express";
import { getAllCampersFull } from "../controllers/campersController.js";

const router = express.Router();

router.get("/", getAllCampersFull);

export default router;
