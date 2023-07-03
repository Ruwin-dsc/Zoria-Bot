const { EmbedBuilder } = require('discord.js')
const BlacklistGuildDB = require('../models/blacklistguild')
const BlacklistUserDB = require('../models/blacklistuser')

module.exports = {
    name: "blacklist",
    description: "Permet de blacklist un utilisateur ou un serveur [Developer]",
    async run(client, message, args) {
        if(!args[0] || !args[1] || !args[2]) return message.reply("Veuillez mettre les syntaxes correctement !")

        if(!args[0].match(/^(guild|user)$/)) return message.reply("Merci de respecter la syntaxe du commande, `!blacklist [guild/user]`")

        const reason = args.slice(3).join(' ') || "Aucune raison"

        if(args[0] === "guild") {
            if(args[1] === "add") {
                const guild = client.guilds.cache.get(args[2])

                if(!guild) return message.reply("Je suis pas dans ce serveur !")

                const data = await BlacklistGuildDB.findOne({ Guild: guild.id })

                if(data) return message.reply("Ce serveur est déjà blacklist !")
                
                new BlacklistGuildDB({
                    Guild: guild.id,
                    Reason: reason,
                    Time: Date.now()
                }).save();

                return message.reply({ embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: "Commande du développeur", iconURL: `${client.user.displayAvatarURL()}` })
                        .setDescription(`Le serveur ${guild.name} a été blacklist avec succès !`)
                        .setColor(client.color)
                ] })
            } 

            if(args[1] === "remove") {
                const guild = client.guilds.cache.get(args[2])

                if(!guild) return message.reply("Je suis pas dans ce serveur !")

                const data = await BlacklistGuildDB.findOne({ Guild: guild.id })

                if(!data) return message.reply("Ce serveur n'est pas blacklist !")

                data.delete();

                return message.reply({ embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: "Commande du développeur", iconURL: `${client.user.displayAvatarURL()}` })
                        .setDescription(`Le serveur ${guild.name} a été retirer en tant que blacklist avec succès !`)
                        .setColor(client.color)
                ] })
            }
        }

        if(args[0] === "user") {
            if(args[1] === "add") {
                const user = client.users.cache.get(args[2])

                if(!user) return message.reply("Je n'ai pas trouvé cette utilisateur !")

                const data = await BlacklistUserDB.findOne({ Guild: user.id })

                if(data) return message.reply("Cette utilisateur est déjà blacklist !")
                
                new BlacklistUserDB({
                    User: user.id,
                    Reason: reason,
                    Time: Date.now()
                }).save();

                return message.reply({ embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: "Commande du développeur", iconURL: `${client.user.displayAvatarURL()}` })
                        .setDescription(`L'utilisateur ${user} a été blacklist avec succès !`)
                        .setColor(client.color)
                ] })
            } 

            if(args[1] === "remove") {
                const user = client.users.cache.get(args[2])

                if(!user) return message.reply("Je n'ai pas trouvé cette utilisateur !")

                const data = await BlacklistUserDB.findOne({ Guild: user.id })

                if(!data) return message.reply("Cette utilisateur n'est pas blacklist !")

                data.delete();

                return message.reply({ embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: "Commande du développeur", iconURL: `${client.user.displayAvatarURL()}` })
                        .setDescription(`L'utilisateur ${user} a été retirer en tant que blacklist avec succès !`)
                        .setColor(client.color)
                ] })
            }
        }
    }
}