import express from "express";
import {
    getAllProducts,
    addProduct,
    getOneProduct,
    deleteProduct,
    updateProduct,
    addComment,
    addRating,
    deleteComment
} from "./productsController.js";

const router = express.Router();

router.get("/",getAllProducts);

router.post("/product/add",addProduct);

router.get("/product/:id",getOneProduct);

router.delete("/product/:id",deleteProduct);

router.put("/product/:id", updateProduct);

router.post("/comment/product/:id",addComment);

router.post("/rating/product/:id",addRating);

router.delete("/comment/product/:productId/:commentId",deleteComment);

export default router;
