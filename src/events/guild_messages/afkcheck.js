const { EmbedBuilder, ChannelType } = require('discord.js')
const DB = require('../../models/AFKModel')

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        if(message.author.bot) return;

        if(message.channel.type === ChannelType.DM) return

        DB.findOne({GuildID: message.guildId, UserID: message.author.id}, async(err, data) => {
            if(err) throw err;
            if(data) {
                data.delete().then(
                    message.reply({ embeds: [new EmbedBuilder().setColor(client.green).setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` }).setDescription(`✅ Le mode AFK vous a été enlevé car il me semble que vous n'êtes plus AFK `)] })
                )

            }
        })

        if(message.mentions.members.size) {
            const embed = new EmbedBuilder()
                .setColor(client.red)
                .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
            
            message.mentions.members.forEach((m) => {
                DB.findOne({GuildID: message.guildId, UserID: m.id}, async(err, data) => {
                    if(err) throw err;
                    if(!data) return
                    embed.setDescription(`${m} est en mode AFK depuis <t:${data.Time}:R>\n\n> **Raison de l'AFK :** ${data.Status}`)
                    return message.reply({ embeds: [embed] })
                })
            })
        }
    }
}