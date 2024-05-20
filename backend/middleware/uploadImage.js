import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const storage = new GridFsStorage({
  url: process.env.MONGODB_URL,
  file: (req, file) => {

    return {
      bucketName: "photos",
      filename: `${uuidv4()}-${file.originalname}`,
    };
  },
});

export default multer({ storage });
