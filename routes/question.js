const express = require("express");

const answer = require("./answer");
const {
    checkQuestionExist
} = require("../middlewares/helpers/database/databaseErrorHelpers");

const {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion
} = require("../controllers/question");

const {
    getAccessToRoute,
    getQuestionOwnerAccess
} = require("../middlewares/authorization/auth");

 

const router = express.Router();


// Ask New Question
// Permissions - Only Logged In Users
router.get("/",getAllQuestions);
router.get("/:id",checkQuestionExist,getSingleQuestion);
router.post("/ask",getAccessToRoute,askNewQuestion);
router.put("/:id/edit",
[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],
editQuestion);
router.delete("/:id/delete",
[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],
deleteQuestion);

router.use("/:question_id/answers",checkQuestionExist,answer);


module.exports = router;
