var LRU = require("lru-cache");
var options = {
    max: 500,
    dispose: function (key, n) { n.close() }, 
    maxAge: 1000 * 60 * 60 //in ms
}

module.exports = LRU(options);