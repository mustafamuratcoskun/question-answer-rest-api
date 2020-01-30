const express = require("express");
const {
    getSingleAnswer,
    getAllAnswersByQuestion,
    addNewAnswerToQuestion,
    editAnswer,
    deleteAnswer
} = require("../controllers/answer");

const {
    getAccessToRoute,
    getAnswerOwnerAccess
} = require("../middlewares/authorization/auth");

const {
    checkQuestionAndAnswerExist,
    checkQuestionExist
} = require("../middlewares/helpers/database/databaseErrorHelpers");



const router = express.Router({mergeParams:true});

router.get("/",checkQuestionExist,getAllAnswersByQuestion);
router.post("/",[getAccessToRoute,checkQuestionExist],addNewAnswerToQuestion);
router.get("/:answer_id",checkQuestionAndAnswerExist,getSingleAnswer);
router.put("/:answer_id/edit",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],editAnswer);
router.delete("/:answer_id/delete",[checkQuestionAndAnswerExist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);



module.exports = router;
