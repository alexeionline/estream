var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    title: {type: String, required: true},
    description: { type: String, required: true },

    created: { type: Date, required: true, default: Date.now },
    start: { type: Date, required: true },

    locationName: { type: String, required: true },
    location: { type: [Number], index: "2dsphere", required: true, default: [0, 0] }
});

var Event = mongoose.model("Event", eventSchema);

module.exports = Event;