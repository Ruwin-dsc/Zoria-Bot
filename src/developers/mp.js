const { EmbedBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js')

module.exports = {
    name: "mp",
    description: "Permet de mp un utilisateur [Developer]",
    async run(client, message, args) {
        if(!args[0] || !args[1]) return message.reply("Veuillez mettre les syntaxes correctement !")

        const user = client.users.cache.get(args[0])

        if(!user) return message.reply("Je n'ai pas trouvé cette utilisateur !")

        const content = args.slice(1).join(' ')

        const embed = new EmbedBuilder()
            .setTitle("Message privé")
            .setDescription(`${content}`)
            .setAuthor({ name: "Message de l'équipe Protect", iconURL: `${client.user.displayAvatarURL()}` })
            .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
            .setColor(client.color)
            .setTimestamp()

        try {user.send({ content:"Vous avez reçu un message !", embeds: [embed] })} catch(err) {return message.reply("J'ai essayé d'envoyer le MP à l'utilisateur, mais l'utilisateur a désactivé ses MP !")}

        await message.reply({ embeds: [
            new EmbedBuilder()
                .setAuthor({ name: "Commande du développeur", iconURL: `${client.user.displayAvatarURL()}` })
                .setDescription("J'ai envoyé à l'utilisateur le message avec succès !")
                .setColor(client.color)
        ] })
    }
}