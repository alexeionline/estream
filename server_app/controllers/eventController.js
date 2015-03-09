var express = require("express");
var router = express.Router();
var EventService = require("../services/eventService");

router.get("/:id", function (req, res, next) {
    var id = req.params.id;

    EventService.getEvent(id)
    .then(function (data) {
        res.render("event/index", { model: data });
    }).catch(function (err) {
        req.logger.error("controllers/tag.js: Error getting popular tags", { mongoError: err });
        
        var error = new Error();
        error.status = 500;
        error.message = "Something went wrong";
        
        next(error);
    });
    
});

module.exports = router;