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
const prettyMilliseconds = require("pretty-ms")
const {
    evaluate,
    random
} = require("mathjs");

module.exports = {
    name: "flip",
    aliases: ['flipcoin', 'flipc'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        con.query(`SELECT * FROM business LEFT JOIN premiumuser ON business.userId = premiumuser.userId WHERE business.userId = '${message.author.id}'`, async function (error, results, fields) {
            if (error) throw error;
            if (results && results.length) {
                if (!args[0]) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`Please input either **Heads** / **Tails**.`)
                        ]
                    })
                }
                if (!args[1]) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`Please enter a valid bet.`)
                        ]
                    })
                }
                const inputs = ["heads", "tails"];
                let head_tails = args[0].toLowerCase();
                let bet = args[1];
                if (isNaN(bet)) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`Please input a valid number to bet with.`)
                        ]
                    })
                }
                if (!inputs.includes(head_tails)) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`Please input either **Heads** or **Tails**.`)
                        ]
                    })
                }
                if (results[0].premiumLevel === 0) {
                    if (bet < 10 || bet > 5000) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`Please select a valid bet between **$10** - **$5,000**!\n\nHint: Did you know that you can purchase a rank to get a higher bet max?`)
                            ]
                        })
                    }
                } else if (results[0].premiumLevel === 1) {
                    if (bet < 10 || bet > 8000) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`Please select a valid bet between **$10** - **$8,000**!`)
                            ]
                        })
                    }
                } else if (results[0].premiumLevel === 2) {
                    if (bet < 10 || bet > 20000) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`Please select a valid bet between **$10** - **$20,000**!`)
                            ]
                        })
                    }
                } else if (results[0].premiumLevel === 3) {
                    if (bet < 10 || bet > 50000) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`Please select a valid bet between **$10** - **$50,000**!`)
                            ]
                        })
                    }
                } else if (results[0].premiumLevel === 4) {
                    if (bet < 10 || bet > 100000) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`Please select a valid bet between **$10** - **$100,000**!`)
                            ]
                        })
                    }
                } else if (results[0].premiumLevel === 5) {
                    if (bet < 10 || bet > 250000) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`Please select a valid bet between **$10** - **$250,000**!`)
                            ]
                        })
                    }
                }

                let inputvalue = 2;
                if (head_tails == 'heads') {
                    inputvalue = 0;
                } else if (head_tails == 'tails') {
                    inputvalue = 1;
                } else {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`Something went wrong, please contact the developer.`)
                        ]
                    });
                }
                const randomizer = Math.floor(Math.random() * 2);
                if (randomizer == inputvalue) {
                    con.query(`UPDATE business SET businessBalance = businessBalance + ${bet} WHERE userId = '${message.author.id}';`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} **${head_tails}**! You won $${bet.toLocaleString('en-US')}!`)
                            .setFooter(message.author.tag)
                        ]
                    })
                } else {
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${bet} WHERE userId = '${message.author.id}';`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`${emoji.error} **${head_tails}**! You lost $${bet.toLocaleString('en-US')}!`)
                            .setFooter(message.author.tag)
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