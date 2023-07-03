const { model, Schema } = require('mongoose')

module.exports = model("boostData", new Schema({
    Guild: String,
    channelId: String
}))