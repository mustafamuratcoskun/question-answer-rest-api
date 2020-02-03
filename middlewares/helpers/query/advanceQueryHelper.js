const subPaginationMiddleware = (model,options) => {
    
    return async(req,res,next) => {
        const {id} = req.params;
        const arrayName = options.array;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const total = (await model.findById(id).select(arrayName))[arrayName].length;
        
        const  pagination = {}
        if (startIndex > 0 ) {
            pagination.prev = {
                page : page - 1,
                limit
            }
        }
        if (endIndex < total){
            pagination.next = {
                page : page + 1,
                limit
            }
        }
        await model.find({_id: id},{answers: {$slice : [14,10]}}).populate({path : "user",select: "name profile_image"});
        let queryObject = {};
        queryObject[arrayName] = {$slice : [startIndex,limit]};

        let result = await model.find({_id: id},queryObject)
                     .populate(options.populate);

        res.advanceQueryResults = {
            success : true,
            pagination,
            data : result
        };

        next();
    };
}

const paginationHelper = async(model,query,req) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = await model.countDocuments();
    
    const  pagination = {}
    if (startIndex > 0 ) {
        pagination.prev = {
            page : page - 1,
            limit
        }
    }
    if (endIndex < total){
        pagination.next = {
            page : page + 1,
            limit
        }
    }
    return {
        query : query.skip(startIndex).limit(limit),
        pagination : Object.keys(pagination).length === 0 ? undefined : pagination
    };


}

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
const sortHelper = (model,query,req) => {

    const sortKey = req.query.sortBy;

    if (sortKey === "most-answered") {
        
        return query.sort(`-answerCount -title`);
    }
    if (sortKey === "most-liked") {
        return query.sort(`-likeCount -title`);
    }
    // Else
    return query.sort("-createdAt");
}
const populateHelper = (query,populate) => {
    return query.populate(populate);

}
const advanceQueryMiddleware = function(model,options){
    return async function(req,res,next) {
        // Initial Query
        let query = model.find({});

        // Search Parameter
        query = searchHelper(model,query,req);
        
        // Populate If Available
        
        if (options && options.population) {
            query = populateHelper(query,options.population);
        }

        // Sort Helper

        query = sortHelper(model,query,req);

        let pagination;

        // Pagination Helper

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
    }

} 

module.exports = {
    advanceQueryMiddleware,
    subPaginationMiddleware
};