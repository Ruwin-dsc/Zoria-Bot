const DB = require('../../models/logsModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "channelDelete",
    once: false,
    async execute(client, channel) {
        const { guild, name } = channel

        const data = await DB.findOne({ Guild: guild.id }).catch(err => { })

        if(!data) return;

        const logsChannel = await guild.channels.cache.get(data.channelId)
        if(!logsChannel) return

        return logsChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}` })
                    .setTitle("⚙️ | Salon supprimer")
                    .setDescription("Un salon vient d'être supprimer, voici ses informations :\n\n> **Nom du salon :** `" + name + "`")
                    .setFooter({
                        text: client.footer,
                        iconURL: client.user.displayAvatarURL({dynamic: true})
                    })
                ]
        })
    }
};