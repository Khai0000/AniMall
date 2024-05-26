import express from "express";
import {
    getAllServices,
    addNewService,
    getOneService,
    updateService,
    deleteOneService,
    addServiceComment,
    deleteComment,
    updateSlotAvailability,
    getSlotAvailability,
    updateServiceHide
  } from "./serviceItemController.js";

  const router = express.Router();

router.get("/", getAllServices);

router.post("/add", addNewService);//by admin

router.get("/:serviceId", getOneService);//userAndAdmin

router.put("/:serviceId", updateService);//by admin

router.put("/:serviceId/hide", updateServiceHide);//by admin

router.delete("/:serviceId", deleteOneService);//by admin

router.post("/:serviceId/comments", addServiceComment);//userAndAdmin

router.delete("/:serviceId/comments/:commentId", deleteComment);//by user

router.post("/:serviceId/update-availability", updateSlotAvailability); 

router.get("/:serviceId/update-availability/:date", getSlotAvailability); 



export default router;