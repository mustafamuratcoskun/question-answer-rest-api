const User = require("../models/User");

/*
@description : Register New User
@access : Public - Everyone can access this functionality
@route  : {{URL}}/api/v1/auth/register 
@method : POST
*/

const register = async (req,res,next) => {
    
    const {name,email,password,role} = req.body;

    try {
        const user = await User.create({
            name,
            email,
            password,
            role
        });
    
        res.json({
            success : true,
            data : `User Created with id : ${user._id}`
        }).status(200);
    }
    catch(error) {
        console.log(error);
        res.json({
            success : false,
            message : error.message
        }).status(400);

    }
    
}

module.exports = {
    register
};
