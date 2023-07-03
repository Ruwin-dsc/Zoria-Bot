const config = require('../../models/antiraid')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(client, member) {
        const data = await config.findOne({ Guild: member.guild.id })

        if(!data) return;

        if(data.Bot !== true) return;

        if(member.user.bot) return member.kick("Anti Bot activé.")
    }
};