const jwt = require("jsonwebtoken");
const errorWrapper = require("../../helpers/errorWrapper");
const CustomError = require("../../helpers/customError");

const getAccessToRoute = errorWrapper(async(req,res,next) => {
    // Is Token Included
    if (!isTokenIncluded(req)){
        return next(new CustomError("You are not authorized to access this page",403));
    }
    
    // Get Token From Header
    
    const accessToken = getAccessTokenFromHeader(req);
    
    // Control If Token Valid

    jwt.verify(accessToken,process.env.JWT_SECRET_KEY,(err,decodedToken) => {
        
        if (err) {
            return next(new CustomError("You are not authorized to access this page",403));
        }
        req.user = {
            id : decodedToken.id,
            name : decodedToken.name
        };
        next();
    });
    
});

const getAccessTokenFromHeader = (req) => {

    const authorization = req.headers.authorization;
    
    const accessToken = authorization.split(" ")[1];
    return accessToken;

}
const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
}

module.exports = getAccessToRoute;
