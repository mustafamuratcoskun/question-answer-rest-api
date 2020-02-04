const path = require("path");
const root = path.dirname(require.main.filename);


const errorWrapper = require(root + "/helpers/error/errorWrapper");

const {
    searchHelper,
    paginationHelper
} = require("./queryMiddlewareHelpers");


const userQueryMiddleware = function(model,options) {
    return errorWrapper(async function(req,res,next) {
        let query = model.find();

        // Search User By Name
        query = searchHelper("name",query,req);

        // Paginate User

        const paginationResult = await paginationHelper(model,query,req);

        query = paginationResult.query;
        pagination = paginationResult.pagination;
        
        const advanceQueryResults = await query;
        
        res.advanceQueryResults = {
            success : true,
            count : advanceQueryResults.length,
            pagination,
            data : advanceQueryResults
        };
        next();
    });

};

module.exports = userQueryMiddleware;
