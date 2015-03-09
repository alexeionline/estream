var express = require("express");
var router = express.Router();
var Event = require("../../models/event");
var EventService = require("../../services/eventService");
var TagService = require("../../services/tagService");

router.post("/", function (req, res, next) {
    req.checkBody("title", "Empty title").notEmpty();
//    req.checkBody("description", "Empty description").notEmpty();
//    req.checkBody("locationName", "Empty location name").notEmpty();
    req.checkBody("start", "Empty start").notEmpty();
    req.checkBody("start", "Start should be date").isDate();
    req.checkBody("lat", "Empty lat").notEmpty();
    req.checkBody("lat", "Lat should be a float").isFloat();
    req.checkBody("lng", "Empty lng").notEmpty();
    req.checkBody("lng", "Lng should be a float").isFloat();
    
    var errors = req.validationErrors();
    
    if (errors) {
        var validationError = new Error();
        validationError.status = 400;
        validationError.message = errors;
        return next(validationError);
    }

    EventService.save(req.body.title, req.body.description, req.body.start, req.body.locationName, +req.body.lat, +req.body.lng)
        .then(function(event) {
            return TagService.save(event, req.body.tags);
        })
        .then(function(data) {
            res.json({
                data: data
            });
        })
        .catch(function(err) {
            req.logger.error("controllers/event.js: Error saving events", { mongoError: err, body: req.body });
        
            var error = new Error();
            error.status = 500;
            error.message = "Something went wrong";
            next(error);
        });
});

router.get("/", function (req, res, next) {

    EventService.getEvents()
    .then(function (data) {
        return res.json({
            data: data
        });
    }).catch(function (err) {
        req.logger.error("controllers/event.js: Error getting events", { mongoError: err });
        
        var error = new Error();
        error.status = 500;
        error.message = "Something went wrong";
        
        next(error);
    });
});

module.exports = router;
