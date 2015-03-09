var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tagSchema = new Schema({
    tag: { type: String, required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true }
});

var Event = mongoose.model("Tag", tagSchema);

module.exports = Event;