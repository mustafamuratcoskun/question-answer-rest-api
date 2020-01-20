
const CustomError = require("../helpers/customError");
const errorHandler = (err,req,res,next) => {
    

    let customError = new CustomError(err.message,err.status);

    if (err.name === "ValidationError") {
       
       customError = new CustomError(err.message,400);
    }
    if (err.code === 11000) {
        customError = new CustomError("Duplicate Key Found : Please check your info",400); 
    }

    return res.status(customError.status || 500).json({
        success : false,
        message : customError.message || "Internal Server Error"
    });



}
module.exports = errorHandler;
