const User = require("../models/User");
const errorWrapper = require("../helpers/errorWrapper");
const CustomError = require("../helpers/customError");
const bcrypt = require("bcryptjs");


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

    sendTokenToClient(user,res,200);

   
    
});
const login = errorWrapper(async (req,res,next) => {

    const {email,password} = req.body;
    
    if(!validateUserInput(email,password)) {
        return next(new CustomError("Please check your inputs",400));
    }
    
    const user = await User.findOne({email}).select("+password");

    if ( !user || !checkPassword(password,user.password)) {
        
        return next(new CustomError("Please check your credentials",404));
    }


    sendTokenToClient(user,res,200);
    

});


const validateUserInput = (email,password) => email && password;
const checkPassword = (password,hashedPassword) => {

    return bcrypt.compareSync(password, hashedPassword);

}
const sendTokenToClient =  (user,res,status) => {

    // Get Token From User Model
    const token =  user.getTokenFromUserModel();
    const {JWT_COOKIE_EXPIRE,NODE_ENV} = process.env;
    
    // Send To Client With Res
    
    return res
    .status(status)
    .cookie("token",token, {
        httpOnly : true,
        domain : "localhost",
        expires : new Date(Date.now() +  parseInt(JWT_COOKIE_EXPIRE) * 1000 * 60),
        secure : NODE_ENV === "development" ? false : true
    })
    .json({
        success : true,
        token,
        data : {
            name : user.name,
            email : user.email,
            role : user.role
        }
    });
    

}

module.exports = {
    register,
    login
};



