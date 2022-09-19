/* 
- const / var / require -

Ici on va definir toutes les constantes et les variables
/!\ Ne pas toucher lors des mises à jours /!\

*/

const config = require("./utils/config.json")
const login = require("./utils/private.json");
const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_BANS
    ],
    partials: ["CHANNEL"]
});
client.commands = new Discord.Collection();


/*
- Paths / Loaders -

Ici on va définir les dossiers ou seront les commandes et les events
/!\ A vérifier à chaque ajout de commande ou event /!\

*/

// eventsPath
const eventsPath = __dirname + '/events'
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = `${eventsPath}/${file}`
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// ./Commands/Exemple
const commandExemple = fs.readdirSync('./Commands/Exemple/')
    .filter(file => file.endsWith('.js'));
for (const file of commandExemple) {
    const command = require(`./Commands/Exemple/${file}`);
    client.commands.set(command.name, command);
}


client.on('messageCreate', message => {
    if (!message.content.startsWith(config.confbot.prefix) || message.author.bot) return;
    const args = message.content.slice(config.confbot.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        // ./Commands/Exemple
        case "exemple-cmd":
            return client.commands.get('exemple-cmd').execute(message, args, Discord, client);
    }

});

/*
- login / console.log -

Connexion au token et affichage dans la console
location token: ./utils/private.json
*/

client.login(login.token);