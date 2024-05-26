import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
        producttag: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        ratings: {
            total: {
                type: Number,
                default: 0
            },
            1: {
                type: Number,
                default: 0
            },
            2: {
                type: Number,
                default: 0
            },
            3: {
                type: Number,
                default: 0
            },
            4: {
                type: Number,
                default: 0
            },
            5: {
                type: Number,
                default: 0
            }
        },
        comments: {
            type: [{
                name: {
                    type: String,
                    required: true
                },
                content: {
                    type: String,
                    required: true
                }
            }],
            default: []
        },
        stockLevel: {
            type: Number,
            default: 1
        },
        hidden: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

export const ProductModel = mongoose.model("Products", productSchema);
