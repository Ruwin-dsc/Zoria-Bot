const mongoose = require('mongoose')

module.exports = mongoose.model(
    'logs', 
    new mongoose.Schema({
        Guild: String,
        channelId: String
    })
);