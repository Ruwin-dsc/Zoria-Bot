const Logger = require('../../utils/Logger')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "guildCreate",
    once: false,
    async execute(client, guild) {
        let guildsCount = await client.guilds.fetch();

        const embed = new EmbedBuilder()
            .setAuthor({ name: "Arrivé sur un serveur", iconURL: `${client.user.displayAvatarURL()}` })
            .setColor(client.color)
            .setDescription(
                `
                > **Nom du serveur :** ${guild.name}
                > **Identifiant du serveur :** ${guild.id}
                > **Propriétaire du serveur :** <@${(await guild.fetchOwner()).user.id}> \`${(await guild.fetchOwner()).user.tag}\`
                > **Membres :** ${guild.memberCount}
                > **Boosts :** ${guild.premiumTier} (${guild.premiumSubscriptionCount} boost(s))
                > **Date de création :** <t:${parseInt(guild.createdAt / 1000)}:f> (<t:${parseInt(guild.createdAt / 1000)}:R>)
                > **Nombre de serveur ou le bot est présent :** ${guildsCount.size}
                `
            )

        client.channels.cache.get("1051544974325452961").send({ embeds: [embed] })
    }
}