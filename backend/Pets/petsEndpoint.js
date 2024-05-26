import express from "express";
import {
    getAllPets,
    addPet,
    getOnePet,
    deletePet,
    updatePet
} from "./petsController.js";

const router = express.Router();

router.get("/",getAllPets);

router.post("/pet/add",addPet);

router.get("/pet/:id",getOnePet);

router.delete("/pet/:id",deletePet);

router.put("/pet/:id", updatePet);

export default router;
