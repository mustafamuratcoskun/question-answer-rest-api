
const searchHelper = (model,query,req) => {
    if (req.query.search) {
        const searchKey  = Object.keys(model.schema.paths)[0];
        queryObject = {};
        
        const regex = new RegExp(req.query.search,"i");
        queryObject[searchKey] = regex;

        return query.where(queryObject);

    }
    return query;
}
const populateHelper = (query,populate) => {
    return query.populate(populate);

}
const advanceQueryHelper = function(model,options){
    return async function(req,res,next) {
        // Initial Query
        let query = model.find({});

        // Search Parameter
        query = searchHelper(model,query,req);
        
        // Populate If Available
        
        if (options && options.population) {
            query = populateHelper(query,options.population);
        }
        const advanceQueryResults = await query;
        
        res.advanceQueryResults = {
            success : true,
            count : advanceQueryResults.length,
            data : advanceQueryResults
        };
        next();
    }

} 

module.exports = advanceQueryHelper;
