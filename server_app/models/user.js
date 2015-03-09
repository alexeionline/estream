var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var authtokensSchema = new Schema({
    token: { type: String },
    created: { type: Date, default: Date.now },
    valid: { type: Boolean, default: true }
});


var userSchema = new Schema({
    tag: { type: String, required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    
    tokens: [authtokensSchema],
    
    created: { type: Date, default: Date.now, required: true },
    modified: { type: Date, default: Date.now, required: true },
    deleted: { type: Date },

    isdeleted: { type: Boolean, default: false, required: true }
});

var User = mongoose.model("User", userSchema);

module.exports = User;