const express = require("express");

const router = express.Router();

router.get("/getuser",(req,res,next) => {
    res.send("Get a User");
});

module.exports = router;
