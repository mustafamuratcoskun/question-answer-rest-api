const Answer = require("../models/Answer");

const errorWrapper = require("../helpers/errorWrapper");
const CustomError = require("../helpers/customError");


const getSingleAnswer = errorWrapper(async (req,res,next) => {
    const {question_id} = req.prevUrlParams;
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

module.exports = {
    getSingleAnswer
};
