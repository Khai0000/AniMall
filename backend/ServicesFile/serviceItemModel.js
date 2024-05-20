import mongoose from "mongoose";

const serviceItemSchema = mongoose.Schema(
  {
    serviceTitle: {
      type: String,
      require: true,
    },
    serviceImages: {
      type: [String],
      require: true,
    },
    serviceDescription: {
      type: String,
      require: true,
    },
    servicePrice: {
      type: Number,
      require: true,
    },
    serviceRating: {
      total: {
        type: Number,
        default: 0,
      },
      "1_stars": {
        type: Number,
        default: 0,
      },
      "2_stars": {
        type: Number,
        default: 0,
      },
      "3_stars": {
        type: Number,
        default: 0,
      },
      "4_stars": {
        type: Number,
        default: 0,
      },
      "5_stars": {
        type: Number,
        default: 0,
      },
    },
    serviceComments: {
      type: [
        {
          username: {
            type: String,
            required: true,
          },
          content: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
    serviceHide: {
      type: Boolean,
      default: false,
    },
    type:{
      type:String,
      default:"service",
    },
  },
  {
    timestamps: true,
  }
);

export const ServiceItemsModel = mongoose.model(
  "ServiceItems",
  serviceItemSchema
);
