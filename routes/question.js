const express = require("express");
const answer = require("./answer");
const Question = require("../models/Question");


const {
    checkQuestionExist
} = require("../middlewares/helpers/database/databaseErrorHelpers");

const {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    undoLikeQuestion

    
} = require("../controllers/question");

const {
    getAccessToRoute,
    getQuestionOwnerAccess
} = require("../middlewares/authorization/auth");

const questionQueryMiddleware = require("../middlewares/helpers/query/questionQueryMiddleware");
const commentQueryMiddleware = require("../middlewares/helpers/query/commentQueryMiddleware");

const router = express.Router();

// Ask New Question
// Permissions - Only Logged In Users

router.get("/",questionQueryMiddleware(Question, {
    population : {
        path:"user",
        select:"name profile_image"
    }
}),getAllQuestions);


router.get("/:id",[checkQuestionExist,commentQueryMiddleware(Question,{
    array : "answers",
    populate: [{
        path: "user",
        select : "name profile_image"
    },
    {
        path : "answers",
        populate : {
            path:"user"  
        },
        
        select : "content user" 
        
    }]

})],getSingleQuestion);
router.get("/:id/like",[getAccessToRoute,checkQuestionExist],likeQuestion);
router.get("/:id/undo_like",[getAccessToRoute,checkQuestionExist],undoLikeQuestion);
router.post("/ask",getAccessToRoute,askNewQuestion);
router.put("/:id/edit",
[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],
editQuestion);
router.delete("/:id/delete",
[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],
deleteQuestion);

router.use("/:question_id/answers",checkQuestionExist,answer);


module.exports = router;
