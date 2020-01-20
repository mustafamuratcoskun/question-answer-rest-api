const express = require("express");

const router = express.Router();

// Controller Functionality
const {
    register
} = require("../controllers/auth");


router.post("/register",register);


module.exports = router;
