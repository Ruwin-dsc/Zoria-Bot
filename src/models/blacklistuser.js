const { model, Schema } = require("mongoose");

module.exports = model(
    "blacklistuser",
    new Schema({
        User: String,
        Reason: String,
        Time: Number
    })
);