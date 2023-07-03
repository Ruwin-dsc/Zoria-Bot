const { model, Schema } = require("mongoose");

module.exports = model(
    "ticketData",
    new Schema({
        Guild: String,
        channelId: String,
        staffRoleId: String,
        categoryId: String,
        memberRoleId: String,
        ButtonLabel: String
    })
);