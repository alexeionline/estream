var express = require("express");
var router = express.Router();
var TagService = require("../../services/tagService");
var EventService = require("../../services/eventService");

router.get("/popular", function(req, res, next) {
    TagService.popular()
    .then(function (data) {
        return res.json({
            data: data
        });
    }).catch(function (err) {
        req.logger.error("controllers/tag.js: Error getting popular tags", { mongoError: err });
        
        var error = new Error();
        error.status = 500;
        error.message = "Something went wrong";
        
        next(error);
    });
});

router.get("/:tag", function (req, res, next) {
    req.checkQuery("tag", "Empty tag").notEmpty();
    
    var errors = req.validationErrors();
    
    if (errors) {
        var validationError = new Error();
        validationError.status = 400;
        validationError.message = errors;
        return next(validationError);
    }
    
    EventService.getEventsByTag(tag).then(function (data) {
        return res.json({
            data: data
        });
    }).catch(function (err) {
        req.logger.error("controllers/event.js: Error getting events by tag", { mongoError: err });
        
        var error = new Error();
        error.status = 500;
        error.message = "Something went wrong";
        
        next(error);
    });
});

module.exports = router;