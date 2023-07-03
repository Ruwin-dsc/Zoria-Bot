const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require('../Logger');

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/src/developers/*.js`)).map(async (cmdFile) => {
        const cmd = require(cmdFile);

        if (!cmd.name) return Logger.warn(`Commande de développeur non-chargée: pas de nom ↓\nFichier -> ${cmdFile}`);

        if (!cmd.description) return Logger.warn(`Commande développeur non-chargée: pas de description ↓\nFichier -> ${cmdFile}`);
        
        client.developers.set(cmd.name, cmd);
        Logger.command(`Command développeur chargé: ${cmd.name}`);
    })
}