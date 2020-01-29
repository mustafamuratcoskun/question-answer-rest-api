const passParameters = (req,res,next) => {
    
    req.prevUrlParams = req.params;

    next();

};

module.exports = passParameters;
