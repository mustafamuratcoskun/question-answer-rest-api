const express = require("express");

const auth = require("./auth");
const admin = require("./admin");
const user = require("./user");
const question = require("./question");

const router = express.Router();


router.use("/auth",auth);
router.use("/admin",admin);
router.use("/users",user);
router.use("/questions",question);


module.exports = router;

