import mongoose from "mongoose";
import { ServiceItemsModel } from "../ServicesFile/serviceItemModel.js";
import { ServiceAvailabilityModel } from "../ServicesFile/serviceSlotAvailabilityModel.js";

export const getAllServices = async (req, res) => {
  try {
    const services = await ServiceItemsModel.find();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addNewService = async (req, res) => {
  const newServiceItem = new ServiceItemsModel({
    serviceTitle: req.body.serviceTitle,
    serviceImages: req.body.serviceImages,
    serviceDescription: req.body.serviceDescription,
    servicePrice: req.body.servicePrice,
  });

  try {
    const saveService = await newServiceItem.save();
    return res.status(200).json(saveService);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getOneService = async (req, res) => {
  const id = req.params.serviceId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid service ID" });
  }

  try {
    const service = await ServiceItemsModel.findById(id);

    if (!service) {
      return res.status(404).json({ error: "The service is not found" });
    }

    return res.status(200).json({ service });
  } catch (error) {
    console.error("Error retrieving service:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateService = async (req, res) => {
  const id = req.params.serviceId;

  console.log("Service ID:", id); // Log the service ID
  console.log("Request Body:", req.body); // Log the request body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid service ID" });
  }

  try {
    const updateService = await ServiceItemsModel.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updateService) {
      console.log("Service not found"); // Log if service is not found
      return res.status(404).json({ error: "The service is not found" });
    }

    return res.status(200).json(updateService);
  } catch (err) {
    console.error("Error updating service:", err); // Log any errors
    return res.status(500).json({ error: err.message });
  }
};

export const deleteOneService = async (req, res) => {
  const id = req.params.serviceId;

  try {
    const serviceToDelete = await ServiceItemsModel.findByIdAndDelete(id);
    if (!serviceToDelete) {
      return res
        .status(404)
        .json({ error: "The service to delete is not found" });
    }

    // const imageUrls = serviceToDelete.image;

    // await Promise.all(
    //   imageUrls.map(async (imageUrl) => {
    //     const imageFileName = imageUrl.split("/").pop();
    //     const deleteImageResponse = await fetch(
    //       `http://localhost:4000/image/${imageFileName}`,
    //       { method: "DELETE" }
    //     );
    //     if (!deleteImageResponse.ok) {
    //       console.error(
    //         `Failed to delete image ${imageFileName}:`,
    //         await deleteImageResponse.text()
    //       );
    //     }
    //   })
    // );

    return res
      .status(200)
      .json({ message: "Service and related photos deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addServiceComment = async (req, res) => {
  const serviceId = req.params.serviceId;
  const { username, userUid, content, rating } = req.body;

  if (!username || !userUid || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const serviceToUpdate = await ServiceItemsModel.findById(serviceId);
    if (!serviceToUpdate) {
      return res.status(404).json({ error: "Service not found" });
    }

    const newComment = { username, userUid, content };
    serviceToUpdate.serviceComments.push(newComment);

    if (rating) {
      serviceToUpdate.serviceRating.total++;
      serviceToUpdate.serviceRating[`${rating}_stars`]++;
    }

    await serviceToUpdate.save();

    return res.status(201).json(serviceToUpdate);
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  const { serviceId, commentId } = req.params;

  try {
    const serviceItem = await ServiceItemsModel.findById(serviceId);

    if (!serviceItem) {
      return res.status(404).json({ error: "Service not found" });
    }

    const commentIndex = serviceItem.serviceComments.findIndex(
      (comment) => comment._id.toString() === commentId
    );

    if (commentIndex === -1) {
      return res.status(404).json({ error: "Comment not found" });
    }

    serviceItem.serviceComments.splice(commentIndex, 1);

    await serviceItem.save();

    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSlotAvailability = async (req, res) => {
  const { serviceId } = req.params;
  const { date, action, selectedSlots } = req.body;

  try {
    if (!serviceId || !date || !action || !selectedSlots) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    
    if (!Array.isArray(selectedSlots)) {
      return res.status(400).json({ error: "selectedSlots must be an array" });
    }

    // Convert date string to Date object
    const dateObj = new Date(date);

    console.log("serviceId type:", typeof serviceId);
    console.log("date type:", typeof date);
    console.log("action type:", typeof action);
    console.log("selectedSlots type:", typeof selectedSlots);
    console.log("selectedSlots:", selectedSlots);

    let availability = await ServiceAvailabilityModel.findOne({
      serviceId,
      date: dateObj,
    });

    console.log("selectedSlotsssssss:", availability);


    if (!availability) {
      availability = new ServiceAvailabilityModel({
        serviceId,
        date: dateObj,
        slots: getDefaultSlotsAvailability(),
      });
    }

    const fullyBookedSlots = [];
    const unbookedSlots = [];

    if (action === "add") {
      selectedSlots.forEach((slot) => {
        const currentCount = availability.slots.get(slot) || 0;
        if (currentCount < 2) {
          availability.slots.set(slot, currentCount + 1);
        } else {
          fullyBookedSlots.push(slot);
        }
      });

      if (fullyBookedSlots.length > 0) {
        return res.status(400).json({
          error: `Slots ${fullyBookedSlots.join(", ")} are already fully booked`,
        });
      }
    } else if (action === "remove") {
      selectedSlots.forEach((slot) => {
        const currentCount = availability.slots.get(slot) || 0;
        if (currentCount > 0) {
          availability.slots.set(slot, currentCount - 1);
        } else {
          unbookedSlots.push(slot);
        }
      });

      if (unbookedSlots.length > 0) {
        return res.status(400).json({
          error: `No bookings found for slots ${unbookedSlots.join(", ")}`,
        });
      }
    } else {
      return res.status(400).json({ error: "Invalid action specified" });
    }

    await availability.save();

    return res
      .status(200)
      .json({ message: "Slot availability updated successfully" });
  } catch (error) {
    console.error("Error updating availability:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const getSlotAvailability = async (req, res) => {
  const { serviceId, date } = req.params;

  try {
    if (!serviceId || !date) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const selectedDate = new Date(date);

    let availability = await ServiceAvailabilityModel.findOne({
      serviceId,
      date: selectedDate,
    });

    if (!availability) {
      availability = new ServiceAvailabilityModel({
        serviceId,
        date: selectedDate,
        slots: getDefaultSlotsAvailability(),
      });
    }

    return res.status(200).json({ availability: availability.slots });
  } catch (error) {
    console.error("Error updating availability:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getDefaultSlotsAvailability = () => {
  const defaultSlots = new Map();
  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];
  timeSlots.forEach(slot => {
    defaultSlots.set(slot, 0);
  });
  return defaultSlots;
};

export const updateServiceHide = async (req, res) =>{
  try {
    const { serviceId } = req.params;
    const { isHidden } = req.body;
    const updatedService = await ServiceItemsModel.findByIdAndUpdate(
      serviceId,
      { serviceHide: isHidden },
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (error) {
    console.error("Error updating service hide status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};