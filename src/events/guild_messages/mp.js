const { EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        if(message.author.bot) return;

        if(message.channel.type === ChannelType.DM) return message.reply({ embeds: [
            new EmbedBuilder()
                .setTitle("Salut !")
                .setDescription("Il paraît que tu m'a envoyé un message en MP, je peux pas t'aider en message privé, pour que je fonctionne correctement invite moi sur un de tes serveurs !")
                .setColor(client.color)
        ], components: [
            new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL("https://discord.com/oauth2/authorize?client_id=1051512649810194472&permissions=8&scope=bot%20applications.commands")
                .setLabel("Inviter Protect")
                .setEmoji("🌐"),

                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://soon.com/")
                    .setLabel("Soon...")
                    .setEmoji("📚"),

                new ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://discord.gg/")
                    .setLabel("Serveur support")
                    .setEmoji("👮")
            )
        ] })
    }
}