var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var likeSchema = new Schema({
    created: { type: Date, required: true, default: Date.now },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

var Like = mongoose.model("Like", likeSchema);

module.exports = Like;