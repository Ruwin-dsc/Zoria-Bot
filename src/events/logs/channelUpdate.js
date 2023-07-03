const DB = require('../../models/logsModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "channelUpdate",
    once: false,
    async execute(client, oldChannel, newChannel) {
        const { guild } = newChannel

        const data = await DB.findOne({ Guild: guild.id }).catch(err => { })

        if(!data) return;
        const logsChannel = await guild.channels.cache.get(data.channelId)
        if(!logsChannel) return

        if(oldChannel.name !== newChannel.name) {
            return logsChannel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setTitle("⚙️ | Salon mis à jour")
                        .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}`})
                        .setDescription("Un salon vient d'être mis à jour, voici ses informations :\n\n> **Nom de l'ancien salon :** `" + oldChannel.name + "`\n> **Nom du nouveau salon :** <#" + newChannel.id + "> `" + newChannel.name + "`")
                        .setFooter({
                            text: client.footer,
                            iconURL: client.user.displayAvatarURL({dynamic: true})
                        })
                    ]
            })
        }
    }
};