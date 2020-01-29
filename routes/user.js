const express = require("express");

const router = express.Router();
const {
    checkUserExist
} = require("../middlewares/helpers/database/databaseErrorHelpers");

// users,profile
const {
    getAllUsers,
    getSingleUser
} = require("../controllers/admin");

// Get All Users

router.get("/",getAllUsers);

// Get Single User Profile

router.get("/profile/:id",checkUserExist,getSingleUser);


module.exports = router;
