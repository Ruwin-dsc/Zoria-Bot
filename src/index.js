const { Client, Collection } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require("mongoose");
const client = new Client({ intents: 3276799 });
const Logger = require('./utils/Logger');
const cfg = require('../config.json')
const { DiscordTogether } = require('discord-together');


['commands', 'buttons', 'modals', 'selects', 'developers'].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'ModalUtil', 'SelectUtil', 'DevelopersUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });
require('./utils/Giveaways')(client);
require('./utils/ErrorHandler')(client);

process.on('exit', code => { Logger.client(`Le processus s'est arrêté avec le code: ${code}`) });
process.on('warning', (...args) => Logger.warn(...args));

module.exports = client;
client.snipes = new Collection();
mongoose.connect(cfg.database_uri, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).then(() => { Logger.db("La connexion à la base de données a été faite avec succès !") })

client.discordTogether = new DiscordTogether(client)
client.color = "#000000";
client.footer = "Protect"
client.red = "#000000";
client.green = "#000000";
client.yellow = "#000000";






client.login(cfg.token);

