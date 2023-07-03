const { Embed } = require('discord.js');
const { EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActivityType } = require('discord.js')
const config = require('../../../config.json')
const { Player } = require('discord-player');
const Logger = require('../../utils/Logger')

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message, embed) {
        if(message.author.bot) return;

        if(!message.content.startsWith(config.prefix)) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const cmdName = args.shift().toLowerCase();

        if(cmdName.length == 0) return;

        let cmd = client.developers.get(cmdName)
        if(!cmd) return;

        if(!config.owner.includes(message.author.id)) return;

        if(cmd) cmd.run(client, message, args, embed)

        Logger.devcmd(`${message.guild.name} | ${message.guildId} | ${message.author.tag} (${message.author.ids})`, `${cmd.name.toUpperCase()}`)
        
      
        

        
    }
}