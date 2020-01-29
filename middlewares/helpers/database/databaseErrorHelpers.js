const path = require("path");
const root = path.dirname(require.main.filename);

const Answer = require(root +"/models/Answer");
const Question = require(root + "/models/Question");
const User = require(root + "/models/User");

const errorWrapper = require(root + "/helpers/errorWrapper");
const CustomError = require(root + "/helpers/customError");

const checkQuestionExist = errorWrapper(async (req,res,next) => {
    const question_id = req.params.id;

    const question = await Question.findById(question_id);
    

    if (!question) {
        return next(new CustomError(`Question Not Found with Id : ${question_id}`,404));
    }
    next();
    
});

const checkQuestionAndAnswerExist = errorWrapper(async (req,res,next) => {
    const {answer_id} = req.params;
    const {question_id} = req.prevUrlParams;

    const question = await Question.findById(question_id);
    if (!question) {
        return next(new CustomError(`Question Not Found with Id : ${question_id}`,404))
    }
    const answer = await Answer.findById(answer_id);
    if (!answer) {
        return next(new CustomError(`Answer Not Found with Id : ${answer_id}`,404));
    }
    next();
});
const checkUserExist = errorWrapper(async(req,res,next) => {
    const {id} = req.params;

    const user = await User.findById(id);

    if (!user) {
        return next(new CustomError(`User Not Found with Id : ${answer_id}`,404));
    }
    next();

});

module.exports = {
    checkQuestionAndAnswerExist,
    checkQuestionExist,
    checkUserExist
};
