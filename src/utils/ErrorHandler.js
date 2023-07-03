const { EmbedBuilder } = require('discord.js')

module.exports = async(client) => {
    const embed = new EmbedBuilder()
        .setTitle("⚠️ Une erreur est survenue")
        .setAuthor({ name: "Anti-Crash" })
        .setColor("Red")

    process.on("unhandledRejection", (reason, p) => {
        console.log(reason, p)

        const owner = client.channels.cache.get("1094683658260070534")
        if(!owner) return;

        owner.send({ embeds: [embed.setDescription("**Unhandled Rejection/Catch :**\n\n```" + reason + "```")] })

    })

    process.on("uncaughtException", (err, origin) => {
        console.log(err, origin)

        const owner = client.channels.cache.get("1094683658260070534")
        if(!owner) return;

        owner.send({ embeds: [embed.setDescription("**Uncaught Exception/Catch :**\n\n```" + err + "```")] })
    })
}