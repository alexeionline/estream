var async = require("async");
var Event = require("../models/event");
var HashTag = require("../models/hashtag");

function Service() { };

Service.prototype.getEvents = function() {
    return new Promise(function(resolve, reject) {
        Event.find().lean().exec(function (err, events) {
            if (err) {
                reject(err);
            } else {
                resolve(events);
            }
        });
    });
}

Service.prototype.save = function(title, description) {
    return new Promise(function(resolve, reject) {
        var event = new Event({
            title: title,
            description: description
        });
        
        event.save(function (err, saved) {
            if (err) {
                reject(err);
            } else {
                resolve(saved);
            }
        });
    });
}

Service.prototype.saveHashtags = function(event, hashtags) {
    return new Promise(function(resolve, reject) {
        async.each(hashtags, function(hashtag, callback) {
            var hash = new HashTag({
                event: event,
                hashtag: hashtag
            });

            hash.save(function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback();
                }
            });
        }, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(event);
            }
        });
    });
}

module.exports = new Service();