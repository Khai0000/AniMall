import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: [String],
            required: true
        },
        animaltag: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        stockLevel: {
            type: Number,
            default: 1
        },
        hidden: {
            type: Boolean,
            default: false
        },
        birthdate:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true,
    }
);

export const PetModel = mongoose.model("Pets", petSchema);
