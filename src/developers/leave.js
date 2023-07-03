const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "leave",
    description: "Permet de quitter un serveur [Developer]",
    async run(client, message, args) {
        if(!args[0]) return message.reply("Merci d'indiquer l'ID du serveur !")

        const guildInfo = client.guilds.cache.get(args[0])
        
        if(!guildInfo) return message.reply("Je suis pas dans ce serveur !")
        
        await message.reply({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: "Commande du développeur", iconURL: `${client.user.displayAvatarURL()}`})
                .setDescription(`Entrain de quitter le serveur **${guildInfo.name}**...`)
                .setColor(client.color)
        ] })

        guildInfo.leave()
    }
}