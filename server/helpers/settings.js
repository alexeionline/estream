var path = require("path");
var settingsPath = path.resolve(__dirname, "..", "../settings/set.json");
var settings = require(settingsPath);

settings.security = {
    jwtKey: "Ha pushok gansta M#$T#RH&KER",
    jwtKey2: "What you gonna do, brotTH$RE! Can 03234u smEE##LL?"
}

module.exports = settings;