const config = require("../utils/config.json");
require("colors")
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log("Bot Up".red)

        const status = [
            () => `Statut 1 | ${client.guilds.cache.size} Serveurs`,
            () => `Statut 2 | ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} Users`,
            () => `Support  | discord.gg/hxcn9Tjwn4`
        ]
        let i = 0
        setInterval(() => {
            client.user.setActivity(status[i](), { type: 'PLAYING' })
            i = ++i % status.length
        }, 1e4)
    }
}