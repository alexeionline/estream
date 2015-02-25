var Event = require("../models/event");

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

module.exports = new Service();