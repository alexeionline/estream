var express = require("express");
var router = express.Router();
var EventService = require("../../services/eventService");
var LikeService = require("../../services/likeService");

router.post("/", function(req, res, next) {
    req.checkBody("eventId", "Empty event").notEmpty();

    var errors = req.validationErrors();
    
    if (errors) {
        var validationError = new Error();
        validationError.status = 400;
        validationError.message = errors;
        return next(validationError);
    }

    EventService.getEvent(req.body.eventId, false)
    .then(function(event) {
        return LikeService.create(event, req.user);
    }).then(function() {
        return res.json({
            data: data
        });        
    }).catch(function () {
        req.logger.error("controllers/like.js: Error posting like", { mongoError: err });
        
        var error = new Error();
        error.status = 500;
        error.message = "Something went wrong";
        
        next(error);
    });
});

module.exports = router;