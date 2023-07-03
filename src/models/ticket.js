const { model, Schema } = require("mongoose");

module.exports = model(
    "ticketsInfos",
    new Schema({
        Guild: String,
        memberId: String,
        channelId: String,
    })
);