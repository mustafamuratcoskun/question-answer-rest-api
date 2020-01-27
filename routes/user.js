const express = require("express");

const router = express.Router();

// users,profile
const {
    getAllUsers,
    getSingleUser
} = require("../controllers/admin");

// Get All Users

router.get("/",getAllUsers);

// Get Single User Profile

router.get("/profile/:id",getSingleUser);


module.exports = router;
