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
    // Send Token After Register
    
    sendTokenToClient(user,200,res);

    /*res.status(200).json({
        success : true,
        data : `User Created with id : ${user._id}`
    });*/
    
});
const sendTokenToClient =  (user,status,res) => {

    // Get Token From User Model
    const token =  user.getTokenFromModel();
    const {JWT_COOKIE_EXPIRE,NODE_ENV} = process.env;


    // Send To Client With Res

    return res
    .status(status)
    .cookie("token",token, {
        httpOnly : true,
        domain : "localhost",
        expires : new Date(Date.now() +  parseInt(JWT_COOKIE_EXPIRE) * 1000 * 60),
        secure : NODE_ENV === "development" ? false:true
    })
    .json({
        success : true,
        token,
        message : `User Created with id : ${user._id}`
    });
    

}
module.exports = {
    register
};



