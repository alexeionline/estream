var express = require("express");
var uuid = require("node-uuid");
var jwt = require("jwt-simple");
var router = express.Router();
var UserService = require("../../services/userService");

router.post("/fb", function(req, res, next) {
    req.checkBody("accessToken", "Access token is empty").notEmpty();
    req.checkBody("id", "Id is empty").notEmpty();

    var errors = req.validationErrors();
    
    if (errors) {
        var validationError = new Error();
        validationError.status = 400;
        validationError.message = errors;
        return next(validationError);
    }

    UserService.getByFacebook(req.body.id, req.body.accessToken)
    .then(UserService.getOrCreateToken)
    .then(function (data) {
            return res.json({
                data: data
        });
    })
    .catch(function (error, mongoErr) {
        if (mongoErr) {
            req.logger.error("controllers/auth.js: Error getting auth fb", { mongoError: mongoErr, body: req.body });
            next(error);
        } else {
            req.logger.error("controllers/auth.js: Error getting auth fb", { mongoError: error, body: req.body });

            var err = new Error();
            err.status = 500;
            err.message = "Something went wrong";

            next(err);
        }
    });
});


module.exports = router;