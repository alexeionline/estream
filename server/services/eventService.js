var async = require("async");
var Event = require("../models/event");
var TagService = require("../services/tagService");

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

    return getEvents.then(TagService.getByEvents);
}

Service.prototype.getEvent = function (id) {
    var getEvent= new Promise(function(resolve, reject) {
        Event.findOne({_id: id}).lean().exec(function (err, ev) {
            if (err) {
                reject(err);
            } else {
                resolve(ev);
            }
        });
    });

    return getEvent.then(TagService.getByEvent);
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

module.exports = new Service();