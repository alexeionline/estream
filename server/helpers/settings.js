var path = require("path");
var settingsPath = path.resolve(__dirname, "..", "../settings/set.json");
var settings = require(settingsPath);

module.exports = settings;