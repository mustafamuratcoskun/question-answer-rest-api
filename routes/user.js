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

const {advanceQueryMiddleware} = require("../middlewares/helpers/query/advanceQueryHelper");

// Get All Users

router.get("/",advanceQueryMiddleware(User),getAllUsers);

// Get Single User Profile

router.get("/profile/:id",checkUserExist,getSingleUser);


module.exports = router;
