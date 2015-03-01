var express = require("express");
var router = express.Router();
var TagService = require("../services/tagService");

router.get("/", function (req, res, next) {
    TagService.popular().then(function (data) {
        var model = {
            tags: data
        };

        res.render("home/index", { model: model });
    }).catch(function (err) {
        req.logger.error("controllers/tag.js: Error getting popular tags", { mongoError: err });
        
        var error = new Error();
        error.status = 500;
        error.message = "Something went wrong";
        
        next(error);
    });
});

module.exports = router;