const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json");
const ee = require("../../botconfig/embed.json");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
    name: "extradaily", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['premiumbonus', 'moneybonus', 'dailypremium'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        con.query(`SELECT * FROM business LEFT JOIN premiumuser ON business.userId = premiumuser.userId WHERE business.userId = '${message.author.id}';`, function (error, results, fields) {
            if (error) throw error;
            if (results.length && results) {
                if (results[0].premiumLevel >= 1) {
                    con.query(`SELECT * FROM cmdcooldowns WHERE userId = '${message.author.id}';`, function (error, results, fields) {
                        let cooldown = 86400000;
                        if (Date.now() >= results[0].dailybonuscooldown + cooldown || results[0].dailybonuscooldown == 0) {
                            const bonus = Math.floor(Math.random() * (100000 - 50000) + 50000);
                            con.query(`UPDATE business SET businessBalance = businessBalance + ${bonus} WHERE userId = '${message.author.id}'`)
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} Your daily extra bonus came in, it contained a total of \`${bonus.toLocaleString('en-US')}\`${emoji.currency}!`)
                                ]
                            })
                            return con.query(`UPDATE cmdcooldowns SET dailybonuscooldown = ${Date.now()} WHERE userId = '${message.author.id}'`);
                        } else {
                            let cooldown = 86400000;
                            const timetobe = results[0].dailybonuscooldown + cooldown;
                            const timenow = Date.now();
                            const timeleft = timetobe - timenow

                            return message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`You must wait **${prettyMilliseconds(timeleft)}** before claiming your daily reward again.`)
                                ]
                            })
                        }
                    });
                } else {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`This is a **Premium** only feature, please purchase premium before trying to use this again.`)
                        ]
                    })
                }
            } else {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`You do not yet have a business registered.\nRegister a business with the \`${prefix}register\` command!`)
                    ]
                })
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