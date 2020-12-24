import express from "express";
import {
    createProduct,
    deleteProduct,
    getProductbyId,
    getProducts,
    updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authmiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);

router
    .route("/:id")
    .get(getProductbyId)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

export default router;
