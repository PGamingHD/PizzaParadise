const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json");
const ee = require("../../botconfig/embed.json");
const axios = require("axios");
const prettyMilliseconds = require("pretty-ms");
module.exports = {
    name: "vote", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['votebot', 'botvote'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`${emoji.currency} Vote for PizzaParadise and recieve **__$100,000__**! ${emoji.currency}\n\nUse \`${prefix}claim\` after you vote!\n\nhttps://top.gg/bot/904757023797813339/vote`)
                .setFooter(message.author.tag)
            ]
        })
    },
};

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/