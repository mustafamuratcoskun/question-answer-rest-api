const Question = require("../models/Question");

const errorWrapper = require("../helpers/errorWrapper");
const CustomError = require("../helpers/customError");

const getAllQuestions = errorWrapper(async(req,res,next) => {

    const questions = await Question.find()
    .populate({path:"user",select:"name profile_image"});

    return res
    .status(200)
    .json({
        success : true,
        count : questions.length,
        data : questions
    });

});
const askNewQuestion = errorWrapper(async(req,res,next) => {

    const information = req.body;

    const question  = await Question.create({
        ...information,
        user : req.user.id
    });

    res.status(200)
    .json({
        success : true,
        message : question
    });
});
const getSingleQuestion = errorWrapper(async (req,res,next) => {
    const {id} = req.params;
    const question = await Question.findById(id)
    .populate({path : "user",select: "name profile_image"});
    
    return res
    .status(200)
    .json({
        success : true,
        data : question
    });

});
const editQuestion = errorWrapper(async(req,res,next) => {
    const {id} = req.params;
    const {title,content} = req.body;
    let question = await Question.findById(id);

    question.title = title;
    question.content = content;

    question = await question.save();
    
    res.status(200)
    .json({
        success : true,
        data :  question
    });

});
const deleteQuestion = errorWrapper(async(req,res,next) => {
    const {id} = req.params;

    await Question.findByIdAndRemove(id);

    
    res.status(200)
    .json({
        success : true,
        data : {}
    });

});

module.exports = {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion
};
