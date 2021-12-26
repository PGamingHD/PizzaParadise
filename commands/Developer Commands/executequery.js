const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json")
const ee = require("../../botconfig/embed.json");
const config = require("../../botconfig/config.json");
const {
    evaluate
} = require("mathjs");

module.exports = {
    name: "executequery", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['executeq', 'execq', 'exec'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con) => {
        if (!config.ownerID.includes(message.author.id)) return;
        const toexec = args.join(" ");
        con.query(`${toexec}`, function (error, results, fields) {
            if (error) {
                message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`There was an issue with the provided query, please check the console.`)
                    ]
                })
                return console.log(error.sqlMessage)
            } else {
                message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Successfully executed query, please check console for more info.`)
                    ]
                })
                return console.log(results)
            }
        });
    },
};

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/