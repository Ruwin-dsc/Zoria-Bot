const DB = require('../../models/logsModel')
const { EmbedBuilder, GuildBan } = require('discord.js')

module.exports = {
    name: "guildBanAdd",
    once: false,
    /**
     * @param {GuildBan} guildBan 
     */
    async execute(client, guildBan) {
        const { guild, user, reason } = guildBan
        const { id, username, discriminator } = user

        const data = await DB.findOne({ Guild: guild.id }).catch(err => { })

        if(!data) return;
        const logsChannel = await guild.channels.cache.get(data.channelId)
        if(!logsChannel) return

        return logsChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setTitle("⚙️ | Membre banni")
                    .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}`  })
                    .setDescription(`Un membre vient d'être banni, voici ses informations :\n\n> **Membre :** ${user} \`${username}#${discriminator} - ${id}\`\n> **Raison :** ${reason}`)
                    .setFooter({
                        text: client.footer,
                        iconURL: client.user.displayAvatarURL({dynamic: true})
                    })
                ]
        })
    }
};