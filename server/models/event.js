var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    created: {type: String, required: true, default: Date.now}
});

var Event = mongoose.model("Event", eventSchema);

module.exports = Event;