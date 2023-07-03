const mongoose = require('mongoose')

module.exports = mongoose.model(
    'antiraidconfig', 
    new mongoose.Schema({
        Guild: String,
        Bot: Boolean,
        Member: Boolean,
        Spam: Boolean,
        Link: Boolean,
        MassPing: Boolean,
        channelDelete: Boolean,
        channelCreate: Boolean,
        everyone: Boolean
    })
);