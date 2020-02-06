const Answer = require("../models/Answer");
const Question = require("../models/Question");

const errorWrapper = require("../helpers/error/errorWrapper");
const CustomError = require("../helpers/error/customError");


const getSingleAnswer = errorWrapper(async (req,res,next) => {

    const {answer_id} = req.params;
  
    const answer = await Answer
    .findById(answer_id)
    .populate({path : "user",select : "name profile_image"})
    .populate({path : "question",select : "title"});
    
    res
    .status(200)
    .json({
        success : true,
        data : answer
    });
});
const getAllAnswersByQuestion = errorWrapper(async (req,res,next) => {
    const {question_id} = req.params;
    
    const question = await Question
    .findById(question_id)
    .populate("answers");

    const answers = question.answers;

    res
    .status(200)
    .json({
        success : true,
        answerCount : answers.length,
        data : answers
    });

});
const addNewAnswerToQuestion = errorWrapper(async (req,res,next) => {
    const {question_id} = req.params;
    const user_id = req.user.id;
    
    const information = req.body;
    
    const answer = await Answer.create({
        ...information,
        question : question_id,
        user: user_id
    });
    
    res.status(200)
    .json({
        success : true,
        data : answer
    });


});
const editAnswer = errorWrapper(async(req,res,next) => {
    
    const {answer_id} = req.params;
    const {content} = req.body;

    let answer = await Answer.findById(answer_id);
    
    
    answer.content = content;

    answer = await answer.save();
    
    res.status(200)
    .json({
        success : true,
        data : answer
    });

});
const deleteAnswer = errorWrapper(async (req,res,next) => {

    const {question_id,answer_id} = req.params;

    const answer = await Answer.findById(answer_id);

    await answer.remove();

    res.status(200)
    .json({
        success : true,
        message : "Answer Deleted Successfully"
    });

});
const likeAnswer = errorWrapper(async(req,res,next) => {
    const {answer_id} = req.params;
    
    const answer = await Answer.findById(answer_id);

    if (answer.likes.includes(req.user.id)) {
        return next(new CustomError("You already liked this answer",400));
    }
    answer.likes.push(req.user.id);
    answer.likeCount += 1;

    await answer.save();
    
    return res.status(200)
    .json({
        success : true,
        data : answer
    });

});
const undoLikeAnswer = errorWrapper(async(req,res,next) => {
    const {answer_id} = req.params;
    
    const answer = await Answer.findById(answer_id);

    if (!answer.likes.includes(req.user.id)) {
        return next(new CustomError("You can not undo like operation for this answer",400));
    }
    const index = answer.likes.indexOf(req.user.id);

    answer.likes.splice(index,1);
    answer.likeCount -= 1;

    await answer.save();

    res
    .status(200)
    .json({
        success : false,
        data : answer
    });
});


module.exports = {
    getSingleAnswer,
    getAllAnswersByQuestion,
    addNewAnswerToQuestion,
    editAnswer,
    deleteAnswer,
    likeAnswer,
    undoLikeAnswer
};
