var   express           = require("express")
    , path              = require("path")
    , fs                = require("fs")
    , mongoose          = require("mongoose")
    , bodyParser        = require("body-parser")
	, compression		= require("compression")
    , app               = express()
    , exphbs            = require("express-handlebars")
    , expressValidator  = require("express-validator")
    , models_path       = path.resolve(__dirname, "models")
    , settings          = require("./helpers/settings")
    , winston           = require("winston")
    ;

//toobusy implementation
/*app.use(function (req, res, next) {
    /*if (toobusy()) {
        res.send(503, "The server is too busy.");
    } else {
        next();
    }#1#
});*/

//HBS setup
var hbs = exphbs.create({
    defaultLayout: "main"
});

//express middleware
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
	    return {
	      param : param,
	      message   : msg
	    };
  	}
}));

//our middlware
//var authorization = require("./middleware/authorization");
var cors = require("./middleware/cors");
var logger = new (winston.Logger)({
    exitOnError: false,
    transports: [
        new (winston.transports.Console)({level: "error"}),
        new (winston.transports.DailyRotateFile)({ filename: "logs/log.txt", name: "file.all", handleExceptions: true}),
        new (winston.transports.DailyRotateFile)({ level: "error", filename: "logs/error_log.txt", name: "file.error", handleExceptions: true })
    ]
});

//assigning logger
app.use(function (req, res, next) {
    req.logger = res.logger = logger; 
    next();
});

//measure performance
app.use(function(req, res, next) {
    var start = Date.now();
   
    res.on("finish", function () {
        var time = Date.now() - start;
        
        if (time > 10) {
            console.log(time);
            req.logger.info("Request execution time", {elapsed: time, url: req.url});
        }
    });
    next();
});

//defining cors
app.all("*", cors);

//authorization check
//app.all("/api/*", authorization);

//adding models
fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf(".js")) {
        require(models_path + "/" + file);
    }
});

//adding controllers
var eventApi = require("./controllers/api/eventApi");
var tagApi = require("./controllers/api/tagApi");
var authApi = require("./controllers/api/authApi.js");
var likeApi = require("./controllers/api/likeApi.js");

var homeController = require("./controllers/homeController");
var eventController = require("./controllers/eventController");

var authorization = require("./middleware/authorization.js");

app.use("/api/auhtorization", authApi);
app.use("/api/v1/event", eventApi);
app.use("/api/v1/tag", tagApi);
app.use("/api/v1/like", authorization, likeApi);

app.use("/event", eventController);
app.use("/", homeController);


//catch all unmatched routes to errors
app.all("*", function (req, res, next) {
    var err = new Error();
    err.status = 404;
    err.message = "Not found";
    next(err);
});

//return error
app.use(function (err, req, res, next) {
    return res.json({
        error: {
            status: err.status,
            errors: err.message
        },
        data: null
    });
});


var server;
var db = mongoose.connection;
mongoose.connect(settings.db.connectionString);
db.on("error", function(err) {
    if (err) {
        logger.error("Could not connect to mongo", { mongoError: err });
    }
});
db.on("open", function() {
    server = app.listen(settings.env.port || process.env.PORT, function () {
        console.log("Example app listening at http://%s:%s", server.address().address, server.address().port);
	});
});