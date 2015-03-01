var express = require("express");
var router = express.Router();
var TagService = require("../../services/tagService");

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

module.exports = router;