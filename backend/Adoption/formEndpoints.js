import express from "express";
import { getAllForm, addOneForm, getOneForm, deleteOneForm, editForm } from "./formController.js";

const router = express.Router();

router.get("/", getAllForm);
router.post("/post/add", addOneForm);
router.get("/post/:id", getOneForm);
router.delete("/post/:id", deleteOneForm);
router.put("/post/:id", editForm); // Add this line for the editForm endpoint

export default router;
