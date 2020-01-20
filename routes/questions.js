const express = require("express");

const router = express.Router();

router.get("/getquestion",(req,res,next) => {
    res.send("Get a question");
});

module.exports = router;
