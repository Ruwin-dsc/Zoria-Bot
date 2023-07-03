const DB = require('../../models/logsModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "roleCreate",
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
                    .setTitle("⚙️ | Rôle créer")
                    .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}`  })
                    .setDescription(`Un nouveau rôle vient d'être créer, voici ses informations :\n\n> **Rôle :** ${role.id} \`${name}\``)
                    .setFooter({
                        text: client.footer,
                        iconURL: client.user.displayAvatarURL({dynamic: true})
                    })
                ]
        })
    }
};