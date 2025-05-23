import { getAllProducts } from "../controllers/productController.js";
import express from "express";

const router = express.Router();

router.get("/", getAllProducts);

export default router;
