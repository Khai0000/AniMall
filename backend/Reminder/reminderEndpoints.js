import express from "express";
import {
  scheduleAppointment
  } from "./reminderController.js";


const router = express.Router();

router.post('/schedule', scheduleAppointment);

export default router;
