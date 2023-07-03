const DB = require('../../models/logsModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "guildBanRemove",
    once: false,
    async execute(client, guild, user) {
        const { id, username, discriminator } = user

        const data = await DB.findOne({ Guild: guild.id }).catch(err => { })

        if(!data) return;
        const logsChannel = await guild.channels.cache.get(data.channelId)
        if(!logsChannel) return

        return logsChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle("⚙️ | Utilisateur débanni")
                    .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}`})
                    .setDescription(`Un utilisateur vient d'être débanni, voici ses informations :\n\n> **Membre :** ${user} \`${username}#${discriminator} - ${id}\``)
                    .setFooter({
                        text: client.footer,
                        iconURL: client.user.displayAvatarURL({dynamic: true})
                    })
                ]
        })
    }
};