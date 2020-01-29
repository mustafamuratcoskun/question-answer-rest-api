const express = require("express");
const {
    getSingleAnswer
} = require("../controllers/answer");

const {
    getAccessToRoute
} = require("../middlewares/authorization/auth");


const router = express.Router();

router.get("/:answer_id",getSingleAnswer);





module.exports = router;
