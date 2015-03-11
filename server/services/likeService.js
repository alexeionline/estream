var async = require("async");
var Like = require("../models/like");

function Service() { };

Service.prototype.create = function(event, user) {
    return new Promise(function(resolve, reject) {
        var like = new Like({
            event: event,
            user: user
        });

        like.save(function(err, saved) {
            if (err) {
                return reject(err);
            }

            return resolve(saved);
        });
    });
}

module.exports = new Service();