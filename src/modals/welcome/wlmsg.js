const { EmbedBuilder } = require('discord.js')
const { Success } = require('../../utils/Success')
const { Error } = require('../../utils/Error')
const welcomeData = require('../../models/welcomeData')

module.exports = {
    name: "wlmsg",
    async execute(client, interaction) {
        let message = interaction.fields.getTextInputValue("wlcmmsg")

        const data = await welcomeData.findOne({ Guild: interaction.guild.id })

        if(data) {
            data.msg = message
            data.save()
        }

        if(!data) {
            new welcomeData({
                msg: message
            }).save();
        }

        return Success(interaction, "Le message de bienvenue et la configuration de bienvenue a été enregistré avec succès !")
    }
}