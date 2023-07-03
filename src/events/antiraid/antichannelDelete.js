const config = require('../../models/antiraid')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "channelDelete",
    once: false,
    async execute(client, channel) {
        const data = await config.findOne({ Guild: channel.guild.id })

        if(!data) return;

        if(data.channelDelete !== true) return;

        const clone_channel = await channel.clone() 

        clone_channel.send({
            embeds: [
                new EmbedBuilder() 
                    .setAuthor({ name: "Protection anti raid", iconURL: `${client.user.displayAvatarURL()}` })
                    .setDescription("> Le salon vient d'être recréé car le mode anti suppression de salon est activé ! Les permissions du salon ont été automatiquement configurer !")
                    .setColor(client.color)
                    .setTimestamp()
            ]
        })
    }
};