var async = require("async");
var Event = require("../models/event");
var TagService = require("../services/tagService");
var LikeService = require("../services/likeService");

function Service() { };

Service.prototype.getEvents = function () {
    return new Promise(function(resolve, reject) {
        Event.find().lean().exec(function (err, events) {
            if (err) {
                reject(err);
            } else {
                resolve(events);
            }
        });
    }).then(TagService.getByEvents).then(LikeService.populateLikes);
}

Service.prototype.getEventsByTag = function (tag) {
    return new Promise(function (resolve, reject) {
        Tag.find({ tag: tag }).populate("event").lean()
        .exec(function (err, tags) {
            if (err) {
                reject(err);
            } else {
                var events = tags.map(function(matched) {
                    return matched.event;
                });
                resolve(events);
            }
        });
    }).then(TagService.getByEvents).then(LikeService.populateLikes);
}

Service.prototype.getEvent = function (id, lean) {
    var getEvent = new Promise(function (resolve, reject) {
        var query = Event.findOne({ _id: id });

        if (lean) {
            query = query.lean();
        }

        query.exec(function (err, ev) {
            if (err) {
                reject(err);
            } else {
                resolve(ev);
            }
        });
    });

    return getEvent.then(TagService.getByEvent).then(LikeService.populateLikes);
}

Service.prototype.save = function(title, description, start, locationName, lat, lng) {
    return new Promise(function(resolve, reject) {
        var event = new Event({
            title: title,
            description: description,
            start: start,
            locationName: locationName,
            location: [lng, lat]
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

module.exports = new Service();