const DB = require('../../models/logsModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "messageUpdate",
    once: false,
    async execute(client, oldMessage, newMessage) {
        const { guild } = oldMessage

        const data = await DB.findOne({ Guild: guild.id }).catch(err => { })

        if(!data) return;
        
        const logsChannel = await guild.channels.cache.get(data.channelId)

        if(!logsChannel) return

        if(oldMessage.author.bot) return;

        return logsChannel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}`  })
                    .setTitle("⚙️ | Message modifié")
                    .setDescription(`Un message vient d'être modifié, voici ses informations :\n\n> **Auteur du message :** ${oldMessage.author} \`${oldMessage.author.username} - ${oldMessage.author.id}\`\n> **Date de création du message :** <t:${Math.floor(oldMessage.createdAt / 1000)}:R>\n> **Contenu de l'ancien message :** \`${oldMessage.content}\`\n> **Contenu du nouveau message :** \`${newMessage.content}\``)
                    .setFooter({
                        text: client.footer,
                        iconURL: client.user.displayAvatarURL({dynamic: true})
                    })
                    .setTimestamp()
                ]
        })
    }
};