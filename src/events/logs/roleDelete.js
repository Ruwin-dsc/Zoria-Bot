const DB = require('../../models/logsModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "roleDelete",
    once: false,
    async execute(client, role) {
        const { guild, name } = role

        const data = await DB.findOne({ Guild: guild.id }).catch(err => { })

        if(!data) return;
        const logsChannel = await guild.channels.cache.get(data.channelId)
        if(!logsChannel) return

        return logsChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle("⚙️ | Rôle supprimer")
                    .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}` })
                    .setDescription(`Un rôle vient d'être supprimer, voici ses informations :\n\n> **Rôle :** \`${name}\``)
                    .setFooter({
                        text: client.footer,
                        iconURL: client.user.displayAvatarURL({dynamic: true})
                    })
                ]
        })
    }
};