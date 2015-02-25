var express = require("express");
var router = express.Router();
var Event = require("../models/event");
var EventService = require("../services/eventService");

router.post("/", function (req, res, next) {
    req.checkBody("title", "Empty title").notEmpty();
    req.checkBody("description", "Empty description").notEmpty();
    
    var errors = req.validationErrors();
    
    if (errors) {
        var validationError = new Error();
        validationError.status = 400;
        validationError.message = errors;
        return next(validationError);
    }

    EventService.save(req.body.title, req.body.description)
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
    EventService.getEvents().then(function(data) {
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
