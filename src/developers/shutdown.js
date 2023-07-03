const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "shutdown",
    description: "Permet de shutdown le bot [Developer]",
    async run(client, message, args) {
        await message.reply({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: "Commande du développeur", iconURL: `${client.user.displayAvatarURL()}`})
                .setDescription("shutdown en cours...")
                .setColor(client.color)
        ] })

        client.destroy();

    }
}