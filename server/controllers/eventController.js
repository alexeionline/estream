var express = require("express");
var router = express.Router();
var Event = require("../models/event");

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

    var event = new Event({
        title: req.body.title,
        description: req.body.description
    });

    event.save(function(err, saved) {
        if (err) {
            req.logger.error("controllers/event.js: Error saving events", { mongoError: err, body: req.body });
            
            var error = new Error();
            error.status = 500;
            error.message = "Something went wrong";
            next(error);  
        }

        return res.json({
            data: saved
        });
    });
});

router.get("/", function(req, res, next) {
    Event.find().lean().exec(function(err, events) {
        if (err) {
            req.logger.error("controllers/event.js: Error getting events", { mongoError: err });

            var error = new Error();
            error.status = 500;
            error.message = "Something went wrong";
            next(error);
        }

        return res.json({
            data: events
        });
    });
});

module.exports = router;
