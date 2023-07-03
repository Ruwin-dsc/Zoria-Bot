const { Embed } = require('discord.js')
const { EmbedBuilder, MessageEmbed } = require('discord.js')

module.exports = {
    name: "serverlist",
    description: "Permet de rédemmarer le bot [Developer]",
    async run(client, message, args, Discord) {
        let description =
        `Serveurs totaux : ${client.guilds.cache.size}\n\n` + client.guilds.cache
        .sort((a, b) => b.memberCount - a.memberCount)
        .map(r => r)
        .map((r, i) => `**${i + 1}** - ${r.name} ・ ${r.memberCount} Membres ・ ID : ${r.id}`)
        .slice(0, 10)
        .join('\n')

        return message.reply({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: "Commande du développeur", iconURL: `${client.user.displayAvatarURL()}` })
                .setDescription(description)
                .setColor(client.color)
        ] })
       
    }
}