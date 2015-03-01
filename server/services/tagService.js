var async = require("async");
var Tag = require("../models/tag");

function Service() { };

Service.prototype.unique = function (tag) {
    if (tag && tag.length > 0) {
        var unique = [], tempObj = {};
        tag.forEach(function (val) {
            var stringified = val.userRef.toString();
            if (!tempObj[stringified]) {
                unique.push(val);
                tempObj[stringified] = val;
            }
        });
        
        return unique;
    }
    return [];
};

Service.prototype.save = function (event, tags) {
    var service = this;
    return new Promise(function (resolve, reject) {
        var uniqueTags = service.unique(tags);
        async.each(uniqueTags, function (tag, callback) {
            var tagToSave = new Tag({
                event: event,
                tag: tag
            });
            
            tagToSave.save(function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback();
                }
            });
        }, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(event);
            }
        });
    });
}

Service.prototype.getByEvents = function(events) {
    return new Promise(function (resolve, reject) {
        var ids = events.map(function (event) {
            return event._id;
        });
        
        Tag.find({ event: { $in: ids } }).lean().exec(function (err, tags) {
            if (err) {
                reject(err);
            } else {
                var data = events.map(function (event) {
                    var eventTags = tags.filter(function (tag) {
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

Service.prototype.popular = function() {
    return new Promise(function(resolve, reject) {
        Tag.aggregate({
            $group: {
                _id: "$tag",
                count: { $sum: 1 }
            }
        }).exec(function(err, tags) {
            if (err) {
                return reject(err);
            }
            var sorted = tags.sort(function(tag1, tag2) {
                return tag2.count - tag1.count;
            });
            return resolve(sorted);
        });
    });
}

module.exports = new Service();