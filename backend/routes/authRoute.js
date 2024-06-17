import express from "express";
import { login } from "../controllers/auth.js";
import { register } from "../controller/auth.js";

const router = express.Router();

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/user");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });
router.post("/register", upload.single("picture"), register);
router.post("/login", login);

export default router;
