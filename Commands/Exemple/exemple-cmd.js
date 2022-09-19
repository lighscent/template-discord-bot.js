const config = require("../../utils/config.json");
module.exports = {
    name: "exemple-cmd",
    execute(message, args, Discord, client) {
        const embed = new Discord.MessageEmbed()
            .setTitle(`${client.user.username} - Commande d'exemple`)
            .setDescription(`**Rejoins le [discord support](https://discord.gg/hxcn9Tjwn4) pour toute aide**`)
            .addField("📁 ``Field 1``", `Description 1`, true)
            .addField("📁 ``Field 2``", `Description 2`, true)
            .addField("📁 ``Field 3``", `Description 3`, false)
            .addField("📁 ``Field 4``", `Description 4`, false)
            .setThumbnail(`${client.user.avatarURL()}`)
            .setFooter(`${client.guilds.cache.size} Serveurs nous font confiance - !"Its_Azukio#8075`, client.user.avatarURL())
            .setColor(config.embed.color)
            .setTimestamp()

        message.channel.send({ embeds: [embed] })
    }
}