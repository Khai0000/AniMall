import uploadImage from "../middleware/uploadImage.js";
import express from "express";
import { getGfs } from "../server.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/upload", uploadImage.array("file"), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("You must select at least one file");
  }

  const filenames = req.files.map((file) => file.filename);

  const imgUrls = filenames.map(
    (filename) => `http://localhost:4000/image/${filename}`
  );

  return res.status(200).json(imgUrls);
});

router.get("/:imageFileName", async (req, res) => {
  try {
    const response = await getGfs().files.findOne({
      filename: req.params.imageFileName,
    });

    if (!response) {
      return res.status(404).json({ err: "Image not found" });
    }

    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "photos",
    });
    const readStream = bucket.openDownloadStreamByName(response.filename);
    readStream.pipe(res);

    // res.status(200).json(response);
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:imageFileName", async (req, res) => {
  try {
    const response = await getGfs().files.deleteOne({
      filename: req.params.imageFileName,
    });

    if (!response) {
      return res.status(404).json({ err: "Image not found" });
    }

    res.status(200).json({message:"Success"});
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
