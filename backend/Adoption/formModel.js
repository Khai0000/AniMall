import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
   
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    salary: { type: Number, required: true },
    petnum: { type: Number, required: true },
    
  },
  { timestamps: true }
);

export const formModel = mongoose.model("form", formSchema);