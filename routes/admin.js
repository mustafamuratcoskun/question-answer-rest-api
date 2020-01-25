const express = require("express");
const {
    getAccessToRoute,
    adminAccess

} = require("../middlewares/authorization/auth");

const router = express.Router();


// users,user, delete,block

router.use([getAccessToRoute,adminAccess]);

router.get("/users",(req,res,next) => {

    return res.status(200)
    .json({
        success : true
    });

});

module.exports = router;
