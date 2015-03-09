require("array.prototype.find");
var jwt = require("jwt-simple");
var path = require("path");
var settings = require("../helpers/settings");
var User = require("../models/user");
var Cache = require("node-fast-cache");
var cache = new Cache();

module.exports = function (req, res, next) {
    var key = req.header("X-Key");
    
    try {
        if (key) {
            var encodedpayload = jwt.decode(key, settings.security.jwtKey2);
            var firstid = encodedpayload.id;
            
            if (!firstid) {
                var iderror = new Error();
                iderror.status = 401;
                iderror.message = "Invalid Key";
                
                return next(iderror);
            }
            
            var payload = jwt.decode(encodedpayload.token, settings.security.jwtKey + firstid);
            
            var token = payload.token;
            var id = payload.id;
            
            if (!token || !id || (id !== firstid)) {
                var secondiderror = new Error();
                secondiderror.status = 401;
                secondiderror.message = "Invalid Key";
                
                return next(secondiderror);
            }
            
            var existing = cache.get("user-" + id);
            if (existing) {
                req.user = existing;
                return next();
            }
            
            User.findOne({ _id: id }).exec(function (err, user) {
                if (err) {
                    req.logger.error("middleware/authorization.js: Error when finding user", { userId: id, mongoError: err });
                    //add error logging
                    var dbError = new Error();
                    
                    throw dbError;
                }
                
                if (!user) {
                    var notfound = new Error();
                    notfound.status = 404;
                    notfound.message = "User not found";
                    return next(notfound);
                }
                
                var hasToken = user.tokens.find(function (resultToken) {
                    return resultToken.token === token && resultToken.valid;
                });
                
                if (!hasToken) {
                    var unauthorized = new Error();
                    unauthorized.status = 403;
                    unauthorized.message = "Not authorized";
                    return next(unauthorized);
                }
                
                cache.set("user-" + id, user);
                
                req.user = user;
                return next();
            });
        } else {
            var error = new Error();
            error.status = 401;
            error.message = "Invalid Key";
            
            return next(error);
        }
    } catch (e) {
        var serverError = new Error();
        serverError.status = 500;
        serverError.message = "An error has occured";
        
        return next(serverError);
    }
    
}