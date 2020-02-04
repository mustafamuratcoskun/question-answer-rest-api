const path = require("path");
const root = path.dirname(require.main.filename);

const errorWrapper = require(root + "/helpers/error/errorWrapper");

const {getPaginatorVariables,populateHelper} = require("./queryMiddlewareHelpers");

const answerQueryMiddleware = (model,options) => {
    
    return errorWrapper(async(req,res,next) => {
        
        const {id} = req.params;
        const arrayName = options.array;
        
        const total = (await (model.findById(id).select(arrayName)))[arrayName].length;
        
        const {pagination,startIndex,limit} = await getPaginatorVariables(req,total);

        let queryObject = {};

        queryObject[arrayName] = {$slice : [startIndex,limit]};
        
        let query = model.find({_id: id},queryObject);

        query = populateHelper(query,options.populate);


        let result = await query;
        

        res.advanceQueryResults = {
            success : true,
            pagination : Object.keys(pagination).length === 0 ? undefined : pagination,
            data : result
        };

        next();
    });
};

module.exports = answerQueryMiddleware;
