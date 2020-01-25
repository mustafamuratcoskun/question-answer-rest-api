const express = require("express");

const router = express.Router();
const photoUpload = require("../config/js/multer");

// Controller Functionality
const {
    register,
    login,
    logout,
    getLoggedInUser,
    imageUpload,
    updateDetails,
    forgotPassword,
    resetPassword
} = require("../controllers/auth");
const getAccessToRoute = require("../middlewares/authorization/auth");


router.post("/register",register);
router.post("/login",login);
router.get("/logout",getAccessToRoute,logout);
router.get("/user",getAccessToRoute,getLoggedInUser);
router.put("/resetpassword",resetPassword);
router.put("/upload",[getAccessToRoute,photoUpload.single("profile_image")],imageUpload)
router.put("/updatedetails",getAccessToRoute,updateDetails);
router.post("/forgotpassword",forgotPassword)



module.exports = router;
