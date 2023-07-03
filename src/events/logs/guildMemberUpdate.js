const DB = require('../../models/logsModel')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "guildMemberUpdate",
    once: false,
    async execute(client, oldMember, newMember) {
        const { guild, user } = newMember

        const data = await DB.findOne({ Guild: guild.id }).catch(err => { })

        if(!data) return;
        const logsChannel = await guild.channels.cache.get(data.channelId)
        if(!logsChannel) return

        const oldRoles = oldMember.roles.cache.map(r => r.id)
        const newRoles = newMember.roles.cache.map(r => r.id)

        if(oldRoles.length > newRoles.length) {
            const roleId = Unique(oldRoles, newRoles)
            const role = guild.roles.cache.get(roleId[0].toString())

            return logsChannel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setTitle("⚙️ | Mise à jour de rôle d'un membre")
                        .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}`  })
                        .setDescription(`Un membre vient de perdre un rôle, voici ses informations :\n\n> **Membre :** ${user} \`${user.tag} - ${user.id}\`\n> **Rôle :** \`${role.name}\``)
                        .setFooter({
                            text: client.footer,
                            iconURL: client.user.displayAvatarURL({dynamic: true})
                        })
                    ]
            })

        } else if(oldRoles.length < newRoles.length) {
            const roleId = Unique(newRoles, oldRoles)
            const role = guild.roles.cache.get(roleId[0].toString())

            return logsChannel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setTitle("⚙️ | Mise à jour de rôle d'un membre")
                        .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}` })
                        .setDescription(`Un membre vient d'avoir un rôle, voici ses informations :\n\n> **Membre :** ${user} \`${user.tag} - ${user.id}\`\n> **Rôle :** \`${role.name}\``)
                        .setFooter({
                            text: client.footer,
                            iconURL: client.user.displayAvatarURL({dynamic: true})
                        })
                    ]
            })
        } else if(newMember.nickname !== oldMember.nickname) {
            return logsChannel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setTitle("⚙️ | Mise à jour d'un membre")
                        .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}` })
                        .setDescription(`Le surnom d'un membre vient d'être modifié, voici ses informations :\n\n> **Membre :** ${newMember} \`${newMember.user.tag} - ${newMember.user.id}\`\n> **Ancien surnom :** \`${oldMember.nickname}\`\n> **Nouveau surnom :** \`${newMember.nickname}\``)
                        .setFooter({
                            text: client.footer,
                            iconURL: client.user.displayAvatarURL({dynamic: true})
                        })
                    ]
            })
        } else if(!oldMember.premiumSince && newMember.premiumSince) {
            return logsChannel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setTitle("⚙️ | Mise à jour d'un membre")
                        .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}` })
                        .setDescription(`Un membre vient de boost le serveur, voici ses informations :\n\n> **Membre :** ${newMember} \`${newMember.user.tag} - ${newMember.user.id}\``)
                        .setFooter({
                            text: client.footer,
                            iconURL: client.user.displayAvatarURL({dynamic: true})
                        })
                    ]
            })
        } else if(!newMember.premiumSince && oldMember.premiumSince) {
            return logsChannel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setTitle("⚙️ | Mise à jour d'un membre")
                        .setAuthor({ name: `Protect'Logs`, iconURL: `${client.user.displayAvatarURL()}`  })
                        .setDescription(`Un membre vient de unboost le serveur, voici ses informations :\n\n> **Membre :** ${newMember} \`${newMember.user.tag} - ${newMember.user.id}\``)
                        .setFooter({
                            text: client.footer,
                            iconURL: client.user.displayAvatarURL({dynamic: true})
                        })
                    ]
            })
        }

    }
};

/**
 * @param {Array} arr1
 * @param {Array} arr2
 */

function Unique(arr1, arr2) {
    let unique1 = arr1.filter(o => arr2.indexOf(o) === -1)
    let unique2 = arr2.filter(o => arr1.indexOf(o) === -1)

    const unique = unique1.concat(unique2)

    return unique
}