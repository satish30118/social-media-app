const express = require("express");
const {getUser,getBySearch }= require("../controller/user");
const authorization = require("../middleware/authorization");
const router = express.Router();

router.get("/getuser/:id", authorization, getUser);
router.get("/search-user/:name", getBySearch);

module.exports = router;
