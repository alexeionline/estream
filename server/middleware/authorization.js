var UserService = require("../services/user");

module.exports = function (req, res, next) {
    var key = req.header("X-Key");

    UserService.authorize(key).then(function(user) {
        req.user = user;
        next();
    }).catch(function (err, mongoErr) {
        if (mongoErr) {
            req.logger.error("middleware/authorize.js: Error", { mongoError: mongoErr });
        }
        next(err);
    });
}