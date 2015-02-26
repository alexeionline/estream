var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var hastagSchema = new Schema({
    hashtag: { type: String, required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true }
});

var Event = mongoose.model("Hashtag", hastagSchema);

module.exports = Event;