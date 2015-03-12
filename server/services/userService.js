require("array.prototype.find");
var settings = require("../helpers/settings");
var cache = require("../helpers/cache");
var jwt = require("jwt-simple");
var User = require("../models/user");
var FB = require("fb");

function Service() { };

Service.prototype.getOrCreateToken = function(user) {
    return new Promise(function(resolve, reject) {
        var existingToken = user.tokens.find(function (resultToken) {
            return resultToken.valid;
        });

        if (!existingToken) {
            var err = new Error();
            err.message = "Valid token not found";
            err.status = 401;

            return reject(err);
        }
        
        var payload = jwt.encode({ token: existingToken.token, id: user.id }, settings.security.jwtKey + user.id);
        var encoded = jwt.encode({ token: payload, id: user.id }, settings.security.jwtKey2);

        return resolve({
            name: user.name,
            token: encoded
        });
    });
}

Service.prototype.getByFacebook = function(id, token) {
    return new Promise(function(resolve, reject) {
        User.findOne({"facebook.id": id, "facebook.token": token}).exec(function(err, user) {
            if (err) {
                var error = new Error();
                error.message = "Something went wrong";
                error.status = 500;

                return reject(error, err);
            }
            
            if (!user) {
                FB.api("me", {access_token: token}, function(res) {
                    if (!res || res.error) {
                        var fbError = new Error();
                        fbError.message = "Something went wrong";
                        fbError.status = 500;

                        return reject(fbError, !res ? "Some facebook error occured" : res.error);
                    }
                    
                    var newToken = uuid.v4();
                    user = new User({
                        email: user.email,
                        name: user.full_name,
                        facebook: {
                            id: id,
                            token: token
                        }
                    });

                    user.tokens.push({
                        token: newToken
                    });

                    user.save(function(err, saved) {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(saved);
                    });
                });
            } else if (user.facebook.token !== token) {
                var noUser = new Error();
                noUser.message = "Using not found";
                noUser.status = 404;

                return reject(noUser);
            } else {
                return resolve(user);
            }
        });
    });
}

Service.prototype.authorize = function(key) {
    return new Promise(function(resolve, reject) {
        try {
            if (key) {
                var encodedpayload = jwt.decode(key, settings.security.jwtKey2);
                var firstid = encodedpayload.id;
                
                if (!firstid) {
                    var iderror = new Error();
                    iderror.status = 401;
                    iderror.message = "Invalid Key";
                    
                    return reject(iderror);
                }
                
                var payload = jwt.decode(encodedpayload.token, settings.security.jwtKey + firstid);
                
                var token = payload.token;
                var id = payload.id;
                
                if (!token || !id || (id !== firstid)) {
                    var secondiderror = new Error();
                    secondiderror.status = 401;
                    secondiderror.message = "Invalid Key";
                    
                    return reject(secondiderror);
                }

                var cacheKey = "user-" + id;
                if (cache.has(cacheKey)) {
                    return resolve(cache.get(cacheKey));
                }
                
                User.findOne({ _id: id }).exec(function (err, user) {
                    if (err) {
                        //add error logging
                        var dbError = new Error();
                        dbError.status = 404;
                        dbError.message = "User not found";

                        return reject(dbError, err);
                    }
                    
                    if (!user) {
                        var notfound = new Error();
                        notfound.status = 404;
                        notfound.message = "User not found";

                        return reject(notfound);
                    }
                    
                    var hasToken = user.tokens.find(function (resultToken) {
                        return resultToken.token === token && resultToken.valid;
                    });
                    
                    if (!hasToken) {
                        var unauthorized = new Error();
                        unauthorized.status = 403;
                        unauthorized.message = "Not authorized";

                        return reject(unauthorized);
                    }
                    
                    cache.set("user-" + id, user);
                    
                    return resolve(user);
                });
            } else {
                var error = new Error();
                error.status = 401;
                error.message = "Invalid Key";
                
                return reject(error);
            }
        } catch (e) {
            var serverError = new Error();
            serverError.status = 500;
            serverError.message = "An error has occured";
            
            return reject(serverError);
        }
    });
}

module.exports = new Service();