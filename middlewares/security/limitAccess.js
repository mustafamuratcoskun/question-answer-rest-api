const rateLimit = require("express-rate-limit");

const limitAccess = (options) => rateLimit(options);

module.exports = limitAccess;
