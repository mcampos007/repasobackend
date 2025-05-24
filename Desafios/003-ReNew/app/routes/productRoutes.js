import { getAllProducts, createProduct, getProductById } from "../controllers/productController.js";
import express from "express";

const router = express.Router();

router.get("/", getAllProducts);
router.post('/', createProduct); // ✅ Nueva ruta para crear producto
router.get("/:id", getProductById); // ✅ Nueva ruta para obtener producto por ID


export default router;
