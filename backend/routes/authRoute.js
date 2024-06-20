const express = require("express");
const { register, login } = require("../controller/auth");
const multer = require("multer");
const authorization = require("../middleware/authorization");

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
router.get("/private-route", authorization, (req, res) => {
  res.status(200).send({
    success: true,
    message: "verified",
  });
});

module.exports = router;
