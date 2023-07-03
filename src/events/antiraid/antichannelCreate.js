const config = require('../../models/antiraid')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "channelCreate",
    once: false,
    async execute(client, channel) {
        const data = await config.findOne({ Guild: channel.guild.id })

        if(!data) return;

        if(data.channelCreate !== true) return;

        await channel.delete()
    }
};