import express from "express";
import {
  scheduleAppointment,
  sendAdoptionEmail
  } from "./reminderController.js";


const router = express.Router();

router.post('/schedule', scheduleAppointment);
router.post('/adoptionemail',sendAdoptionEmail);

export default router;
