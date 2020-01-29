const express = require("express");
const {
    getSingleAnswer
} = require("../controllers/answer");

const {
    getAccessToRoute
} = require("../middlewares/authorization/auth");

const {
    checkQuestionAndAnswerExist
} = require("../middlewares/helpers/database/databaseErrorHelpers");



const router = express.Router({mergeParams:true});

router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer);





module.exports = router;
