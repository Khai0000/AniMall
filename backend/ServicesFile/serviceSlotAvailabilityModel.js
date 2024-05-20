import mongoose from "mongoose";

const serviceAvailabilitySchema = mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceItems",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    slots: {
      type: Map,
      of: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export const ServiceAvailabilityModel = mongoose.model("ServiceAvailability",serviceAvailabilitySchema);
