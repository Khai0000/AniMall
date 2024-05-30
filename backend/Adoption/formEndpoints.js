import express from "express";
import { getAllForm, addOneForm, getOneForm, deleteOneForm } from "./formController.js";

const router = express.Router();

router.get("/", getAllForm);
router.post("/post/add", addOneForm);
router.get("/post/:id", getOneForm);
router.delete("/post/:id", deleteOneForm);

export default router;
