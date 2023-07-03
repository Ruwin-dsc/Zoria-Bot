const Discord = require("discord.js")
const { EmbedBuilder } = require("discord.js")
module.exports = {

    name : "vanity",//Nom de la commande
    description: "Permet de voir l'url personnaliser du serveur",// Description au "/"
    dm: false, // Ne marche pas en DM
    async run(client, message, args) {

        let Embed = new EmbedBuilder()
        .setColor("#0A0A0A") // Couleur HTML
        .setTitle(`Vanity`) // Titre (Vanity = URL Personnaliser+ )
        .setDescription(message.guild.vanityURLCode ?`L'URL personnaliser du serveur est : **${message.guild.vanityURLCode}**`: `Il n'y as pas d'URL personnaliser`)//Description avec condition si L'URL Personnaliser existe ou non
        .setFooter({ text: `La commande /vanity a était exécuter !`})// Footer 
        .setTimestamp() // Temps/Horaire
 message.reply({embeds: [Embed]})// Réponse du bot par l'Embed
    }

}