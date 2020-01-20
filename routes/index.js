const express = require("express");

const auth = require("./auth");
const questions = require("./questions");

const router = express.Router();


router.use("/auth",auth);
router.use("/questions",questions);



module.exports = router;

