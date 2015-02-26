var async = require("async");
var Event = require("../models/event");
var HashTag = require("../models/hashtag");

function Service() { };

Service.prototype.getEvents = function () {

    var getEvents = new Promise(function(resolve, reject) {
        Event.find().lean().exec(function (err, events) {
            if (err) {
                reject(err);
            } else {
                resolve(events);
            }
        });
        });
    var getHashTags = function (events) {
        return new Promise(function (resolve, reject) {
            var ids = events.map(function (event) {
                return event._id;
            });

            HashTag.find({ event: { $in: ids } }).lean().exec(function(err, hashTags) {
                if (err) {
                    reject(err);
                } else {
                    var data = events.map(function(event) {
                        var eventTags = hashTags.filter(function(tag) {
                            return tag.event.toString() === event._id.toString();
                        });

                        event.tags = eventTags;

                        return event;
                    });
                    resolve(data);
                }
            });
        });
    }


    return getEvents.then(function(events) {
        return getHashTags(events);
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