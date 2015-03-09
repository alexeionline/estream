var express = require("express");
var uuid = require("node-uuid");
var jwt = require("jwt-simple");
var router = express.Router();

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


});


module.exports = router;