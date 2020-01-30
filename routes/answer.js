const express = require("express");
const {
    getSingleAnswer,
    getAllAnswersByQuestion,
    addNewAnswerToQuestion
} = require("../controllers/answer");

const {
    getAccessToRoute
} = require("../middlewares/authorization/auth");

const {
    checkQuestionAndAnswerExist,
    checkQuestionExist
} = require("../middlewares/helpers/database/databaseErrorHelpers");



const router = express.Router({mergeParams:true});

router.get("/",checkQuestionExist,getAllAnswersByQuestion);
router.post("/",[getAccessToRoute,checkQuestionExist],addNewAnswerToQuestion);
router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer);





module.exports = router;
