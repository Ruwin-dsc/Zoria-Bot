const { model, Schema } = require("mongoose");

module.exports = model(
    "blacklistguild",
    new Schema({
        Guild: String,
        Reason: String,
        Time: Number
    })
);