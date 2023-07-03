const config = require('../../models/antiraid')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        const data = await config.findOne({ Guild: message.guildId })
        if(!data) return

        if(data.everyone !== true) return

        if(message.mentions.everyone) {
            await message.delete()

            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: "Protection anti raid", iconURL: `${client.user.displayAvatarURL()}`})
                        .setDescription("> Le message d'everyone/here a été supprimé !")
                        .setColor(client.color)
                        .setTimestamp()
                ]
            })
        }
        
    }
}