const User = require("../models/User");
const errorWrapper = require("../helpers/errorWrapper");
const CustomError = require("../helpers/customError");


/*
@description : Register New User
@access : Public - Everyone can access this functionality
@route  : {{URL}}/api/v1/auth/register 
@method : POST
*/

// Error Handler Makalesi - https://thecodebarbarian.com/80-20-guide-to-express-error-handling
const register =  errorWrapper(async (req,res,next) => {
  
    const {name,email,password,role} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    res.status(200).json({
        success : true,
        data : `User Created with id : ${user._id}`
    });
    
});

module.exports = {
    register
};



