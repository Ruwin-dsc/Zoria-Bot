const DB = require('../../models/logsModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "messageDelete",
    once: false,
    async execute(client, message) {
        const { guild } = message;

        const data = await DB.findOne({ Guild: guild.id }).catch(err => { })

        if(!data) return;
        
        const logsChannel = await guild.channels.cache.get(data.channelId)

        if(!logsChannel) return

        if(message.author.bot) return;

        return logsChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}`  })
                    .setTitle("⚙️ | Message supprimer")
                    .setDescription(`Un message vient d'être supprimer, voici ses informations :\n\n> **Auteur du message :** ${message.author} \`${message.author.username} - ${message.author.id}\`\n> **Date de création du message :** <t:${Math.floor(message.createdAt / 1000)}:R>\n> **Contenu du message :** \`${message.content}\``)
                    .setFooter({
                        text: client.footer,
                        iconURL: client.user.displayAvatarURL({dynamic: true})
                    })
                    .setTimestamp()
                ]
        })
    }
};