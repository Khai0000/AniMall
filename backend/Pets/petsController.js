import mongoose from "mongoose";
import {PetModel} from "./petsModel.js";

export const getAllPets = async(req,res)=>{
    try{
        const response = await PetModel.find().sort({ createdAt: -1 });
        return res.status(200).json(response);
    }catch(error){
        return res.status(500).json({error:error.message});
    }
};

export const getOnePet = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error:"Invalid pet id"});

    try{
        const response = await PetModel.findById({_id:id});

        if(!response)
            return res.status(404).json({error:"The pet is not found"});

        return res.status(200).json(response);

    }catch(error){
        return res.status(400).json({error:error.message});
    }
}

export const deletePet = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPet = await PetModel.findByIdAndDelete(id);
        if (!deletedPet) {
            return res.status(404).json({ message: "Pet not found" });
        }
        res.status(200).json({ message: "Pet deleted successfully", data: deletedPet });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updatePet = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPet = await PetModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedPet) {
            return res.status(404).json({ message: "Pet not found" });
        }
        res.status(200).json({ message: "Pet updated successfully", data: updatedPet });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const addPet = async (req,res)=>{
    const {title, description, image, animaltag, price,stockLevel,hidden,birthdate} = req.body;
    try{
        const newPet = await PetModel.create({
            title,
            description,
            image, 
            animaltag, 
            price,
            stockLevel,
            hidden,
            birthdate
        })
        return res.status(200).json(newPet);
    }catch (error){
        return res.status(400).json({error:error.message});
    }
}


