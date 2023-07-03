const DB = require('../../models/boostData')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "guildMemberUpdate",
    once: false,
    async execute(client, oldMember, newMember) {
        const oldStatus = oldMember.premiumSince;
        const newStatus = newMember.premiumSince;

        const data = await DB.findOne({ Guild: newMember.guild.id })

        if(!data) return;

        const channel = client.channels.cache.get(data.channelId)

        if(!channel) return;

        if(!oldStatus && newStatus) channel.send({ embeds: [
            new EmbedBuilder()
                .setTitle("Nouveau boost !")
                .setDescription(`> ${newMember.user} vient de booster le serveur ! Nous sommes maintenant à **${newStatus.guild.premiumSubscriptionCount}** boost ! Merci à toi !`)
                .setColor("#c828d8")
                .setAuthor({ name: `Boost d'un serveur`, iconURL: `${client.user.displayAvatarURL()}` })
        ] })


        if(oldStatus && !newStatus) channel.send({ embeds: [
            new EmbedBuilder()
                .setTitle("Unboost 🥲")
                .setDescription(`> ${newMember.user} vient de unbooster le serveur ! Nous sommes maintenant à **${newStatus.guild.premiumSubscriptionCount}** boost !`)
                .setColor("#c828d8")
                .setAuthor({ name: `Unboost d'un serveur`, iconURL: `${client.user.displayAvatarURL()}`})
        ] })
    }
};