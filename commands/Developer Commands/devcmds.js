const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json")
const ee = require("../../botconfig/embed.json");
const config = require("../../botconfig/config.json");

module.exports = {
    name: "devcmds", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['devcmd', 'devs', 'dev', 'devonly'],
    cooldown: 1,
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!config.ownerID.includes(message.author.id)) return;
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setFooter(`Total 9 developer commands.`)
                .setTitle(`Developer Commands`)
                .setDescription(
                    `\`devcmds\`, \`eval\`, \`executequery\`, \`hostdrop\`, \`reload\`, \`removeslash\`, \`shutdown\`, \`test\`, \`devinfo\``
                ),
            ],
        });
    },
};

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/