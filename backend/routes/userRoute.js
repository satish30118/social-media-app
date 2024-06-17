const express = require("express");
const getUser = require("../controller/user");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.get("/getuser", authorization, getUser);

module.exports = router;
