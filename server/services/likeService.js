require("array.prototype.find");
var async = require("async");
var Like = require("../models/like");

function Service() { };

Service.prototype.populateLikes = function(events) {
    return new Promise(function(resolve, reject) {
        var eventIds;
        var isArray = Array.isArray(events);
        
        if (isArray) {
            eventIds = events.map(function(event) {
                return event.id || event._id.toString();
            });
        } else {
            eventIds = [events.id || events._id.toString()];
        }

        Like.find({ event: { $in: eventIds } }).select("_id event").lean()
        .exec(function (err, likes) {
            if (err) {
                return reject(err);
            }

            var withLikes;
            
            if (isArray) {
                withLikes = events.map(function(event) {
                    var eventLikes = likes.filter(function(like) {
                        return like.event.toString() === (event.id || event._id.toString());
                    });

                    event.likes = eventLikes.length;
                    return event;
                });
            } else {
                var eventLikes = likes.filter(function (like) {
                    return like.event.toString() === (event.id || event._id.toString());
                });

                withLikes = events;
                withLikes.likes = eventLikes.length;
            }

            resolve(withLikes);
        });
    });
}

Service.prototype.save = function(event, user) {
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