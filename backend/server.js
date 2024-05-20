import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import date from "./Date/date.js";
import dotenv from "dotenv";
import forumPostRouter from "./ForumPosts/forumPostsEndpoints.js";
import servicesRouter from "./ServicesFile/serviceItemEndpoints.js";
import cartRouter from "./Cart/cartEndpoints.js";
import upload from "./ImageUploadRoute/upload.js";
import Grid from "gridfs-stream";

let gfs;

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("Method", req.method, "at", req.path, date);
  next();
});

app.get("/", (req, res) => {
  res.send("<h1>Hi</hi>");
});

app.use("/api/community", forumPostRouter);
app.use("/api/services", servicesRouter);
app.use("/api/cart",cartRouter);
app.use("/image", upload);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db and server listening at port",
        process.env.PORT
      );
    });

    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection("photos");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
    app.get("/", (req, res) => {
      res
        .status(500)
        .send("Internal Server Error. Unable to connect to the database.");
    });
  });

export const getGfs = () => gfs;
