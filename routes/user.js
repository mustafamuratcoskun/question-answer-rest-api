const express = require("express");
const User = require("../models/User");

const router = express.Router();
const {
    checkUserExist
} = require("../middlewares/helpers/database/databaseErrorHelpers");

// users,profile
const {
    getAllUsers,
    getSingleUser
} = require("../controllers/admin");

const userQueryMiddleware = require("../middlewares/helpers/query/userQueryMiddleware");

// Get All Users

router.get("/",userQueryMiddleware(User),getAllUsers);

// Get Single User Profile

router.get("/profile/:id",checkUserExist,getSingleUser);


module.exports = router;
