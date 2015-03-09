var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var authtokensSchema = new Schema({
    token: { type: String },
    created: { type: Date, default: Date.now },
    valid: { type: Boolean, default: true }
});


var userSchema = new Schema({
    facebook: {
        id: String,
        token: String
    },
    
    name: { type: String, required: true },
    email: {type: String, required: true},
    
    tokens: [authtokensSchema],
    
    created: { type: Date, default: Date.now, required: true },
    modified: { type: Date, default: Date.now, required: true },
    deleted: { type: Date },

    isdeleted: { type: Boolean, default: false, required: true }
});

var User = mongoose.model("User", userSchema);

module.exports = User;