const express = require("express");

const auth = require("./auth");
const admin = require("./admin");
const users = require("./users");
const router = express.Router();


router.use("/auth",auth);
router.use("/admin",admin);
router.use("/users",users);



module.exports = router;

