const Question = require("../models/Question");

const errorWrapper = require("../helpers/errorWrapper");
const CustomError = require("../helpers/customError");


const getAllQuestions = errorWrapper(async(req,res,next) => {

    const questions = await Question.find({});

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
    console.log({
        ...information,
        user : req.user.id
    });

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

    const result = await getQuestionById(id);

    if (!result.success){
        return next(result.error);

    }

    return res
    .status(200)
    .json({
        success : true,
        data : result.question
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
const getQuestionById = async (id) => {
    
    const question = await Question.findById(id);
    
    if (!question) {
        return {
            success : false,
            error : new CustomError(`Question Not Found with Id : ${id}`,404)
        }
        
    }
    return {
            success: true,
            question
        }
};

module.exports = {
    askNewQuestion,
    getAllQuestions,
    getSingleQuestion,
    editQuestion,
    deleteQuestion
};
