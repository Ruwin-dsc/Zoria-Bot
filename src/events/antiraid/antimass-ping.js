const config = require('../../models/antiraid')

module.exports = {
    name: "messageCreate",
    once: false,
    async execute(client, message) {
        const data = await config.findOne({ Guild: message.guildId }).catch(err => console.log(err))

        if(!data) return
        if(data.MassPing !== true) return
        if(message.author.bot) return;

        let content = message.content.split(" ")
        let count = 0;

        for(let i = 0; i < content.length; i++) {

            if(content[i].match(new RegExp(/<@!*&*[0-9]+>/g))) count++;
        }

        if(count > 5) {
            await message.delete()
            if(message.member.permissions.has("ModerateMembers")) return;

            try {await message.member.send(`⚠️ Avertissement :\n> Le mass ping n'est pas autorisé dans le serveur **${message.guild.name}**.`)} catch(err) {}
        }
    }
}