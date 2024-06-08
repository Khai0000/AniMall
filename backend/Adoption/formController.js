import mongoose from "mongoose";
import { formModel } from "../Adoption/formModel.js";

export const getAllForm = async (req, res) => {
  try {
    const response = await formModel.find().sort({ createdAt: -1 });
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addOneForm = async (req, res) => {
  const { firstName, lastName, email, phone, address, city, postalCode, salary, petnum, userID, } = req.body;
  console.log('Request body:', req.body);
  
  try {
    const newPost = await formModel.create({
    
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
      salary,
      petnum,
      userID,
    });
    return res.status(200).json(newPost);
  } catch (error) {
    console.error("Error creating form:", error);
    return res.status(400).json({ error: error.message });
  }
};

export const getOneForm = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid form id" });

  try {
    const response = await formModel.findById(id);
    if (!response) return res.status(404).json({ error: "Form not found" });

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteOneForm = async (req, res) => {
  const { id } = req.params;

  try {
    const postToDelete = await formModel.findByIdAndDelete(id);
    if (!postToDelete) return res.status(404).json({ error: "Form not found" });

    return res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const editForm = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phone, address, city, postalCode, salary, petnum, userID } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid form id" });
  }

  try {
    const updatedForm = await formModel.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        phone,
        address,
        city,
        postalCode,
        salary,
        petnum,
        userID,
      },
      { new: true, runValidators: true } // options to return the updated document and run schema validators
    );

    if (!updatedForm) {
      return res.status(404).json({ error: "Form not found" });
    }

    return res.status(200).json(updatedForm);
  } catch (error) {
    console.error("Error updating form:", error);
    return res.status(400).json({ error: error.message });
  }
};
