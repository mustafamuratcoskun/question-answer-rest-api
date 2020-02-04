const getPaginatorVariables = async (req,total) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
 

    
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
        pagination,
        startIndex,
        limit
    }
}


const paginationHelper = async (model,query,req) => {
    const total = await model.countDocuments();
    
    const {pagination,startIndex,limit} = await getPaginatorVariables(
        req,
       total);
   
    return {
        query : query.skip(startIndex).limit(limit),
        pagination : Object.keys(pagination).length === 0 ? undefined : pagination
    };
}

const searchHelper = (searchKey,query,req) => {
    if (req.query.search) {
      
        queryObject = {};
        
        const regex = new RegExp(req.query.search,"i");
        queryObject[searchKey] = regex;

        return query.where(queryObject);

    }
    return query;
}
const populateHelper = (query,populate) => {
    return query.populate(populate);

};
const questionSortHelper = (query,req) => {

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

module.exports = {
    getPaginatorVariables,
    paginationHelper,
    searchHelper,
    questionSortHelper,
    populateHelper
};