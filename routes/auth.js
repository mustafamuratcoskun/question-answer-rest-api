const express = require("express");

const router = express.Router();

// Controller Functionality
const {
    register,
    login,
    getLoggedInUser
} = require("../controllers/auth");
const getAccessToRoute = require("../middlewares/authorization/auth");


router.post("/register",register);
router.post("/login",login)
router.get("/user",getAccessToRoute,getLoggedInUser);



module.exports = router;
