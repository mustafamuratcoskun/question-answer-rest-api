const Answer = require("../models/Answer");
const Question = require("../models/Question");

const errorWrapper = require("../helpers/errorWrapper");
const CustomError = require("../helpers/customError");


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
    .populate("answers")
    .select("answers");

    const answers = question.answers;

    res
    .status(200)
    .json({
        success : true,
        answersCount : answers.length,
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
    console.log(answer);
    
    answer.content = content;

    answer = await answer.save();
    
    res.status(200)
    .json({
        success : true,
        data : answer
    });

});
const deleteAnswer = errorWrapper(async (req,res,next) => {
    res.status(200)
    .json({
        success : true,
        message : "Delete Answer"
    });

});

module.exports = {
    getSingleAnswer,
    getAllAnswersByQuestion,
    addNewAnswerToQuestion,
    editAnswer,
    deleteAnswer
};
