const path = require("path");
const root = path.dirname(require.main.filename);

const errorWrapper = require(root + "/helpers/error/errorWrapper");

const {
    
    searchHelper,
    populateHelper,
    questionSortHelper,
    paginationHelper

} = require("./queryMiddlewareHelpers");

const questionQueryMiddleware = function(model,options){
    return errorWrapper(async function(req,res,next) {
        // Initial Query
        let query = model.find({});

        // Search Parameter
        query = searchHelper("title",query,req);
        
        // Populate If Available
        
        if (options && options.population) {
            query = populateHelper(query,options.population);
        }

        // Sort Question

        query = questionSortHelper(query,req);

        let pagination;

        // Paginate Question

        const paginationResult = await paginationHelper(model,query,req);

        query = paginationResult.query;

        pagination = paginationResult.pagination;
        
        const advanceQueryResults = await query;
        console.log(pagination);
        
        res.advanceQueryResults = {
            success : true,
            count : advanceQueryResults.length,
            pagination : pagination,
            data : advanceQueryResults
        };
        next();
    })
}; 

module.exports = questionQueryMiddleware;
