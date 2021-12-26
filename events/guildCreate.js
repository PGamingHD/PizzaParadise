const {
    Message,
    MessageEmbed,
    WebhookClient
} = require("discord.js");
const emoji = require("../botconfig/emojis.json")
const ee = require("../botconfig/embed.json");
const config = require("../botconfig/config.json");
const client = require("../index");
const webhook = new WebhookClient({
    url: config.webhookurl,
});

client.on("guildCreate", async (guild, client) => {
    /*
    const findBlacklist = await blacklist.findOne({
        guildID: guild.id,
    })
    if (findBlacklist) {
        guild.leave();
        return;
    }
    */
    return webhook.send({
        content: `${emoji.success} I was just invited to a new server.`
    })
});

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/