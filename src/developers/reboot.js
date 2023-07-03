const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "reboot",
    description: "Permet de rédemmarer le bot [Developer]",
    async run(client, message, args) {
        await message.reply({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: "Commande du développeur", iconURL: `${client.user.displayAvatarURL()}`})
                .setDescription("Redémarrage en cours...")
                .setColor(client.color)
        ] })

        console.clear()
        return process.exit()
    }
}