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
    name: "roulette",
    aliases: ['roulettewheel', 'roulettes'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con) => {
        con.query(`SELECT * FROM business LEFT JOIN premiumuser ON business.userId = premiumuser.userId WHERE business.userId = '${message.author.id}';`, function (error, results, fields) {
            if (error) throw error;
            if (results && results.length) {
                if (!args[0]) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`Please enter a valid color to be on, **green**, **black** or **red**.`)
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
                let randomizer = Math.floor(Math.random() * (0 - 14) + 14);
                let color = undefined;
                const inputs = ["green", "black", "red"];
                const colorbet = args[0].toLowerCase();
                const bet = args[1];
                if (!inputs.includes(colorbet)) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`Please input either **Heads** or **Tails**.`)
                        ]
                    })
                }
                if (isNaN(bet)) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`Please input a valid number to bet with.`)
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

                if (randomizer == 0) {
                    color = 'Green'
                } else if (randomizer <= 1 || randomizer >= 7) {
                    color = 'Red'
                } else if (randomizer <= 8 || randomizer >= 14) {
                    color = 'Black'
                }

                con.query(`UPDATE business SET businessBalance = businessBalance - ${bet} WHERE userId = '${message.author.id}';`)

                if (color == 'Red' && colorbet == 'red') {
                    let money = bet * 1.5;
                    con.query(`UPDATE business SET businessBalance = businessBalance + ${money} WHERE userId = '${message.author.id}';`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`**Winner!** The color landed on **${color}**, your bet has been multiplied by **1.5x**`)
                        ]
                    })
                } else if (color == 'Green' && colorbet == 'green') {
                    let money = bet * 15;
                    con.query(`UPDATE business SET businessBalance = businessBalance + ${money} WHERE userId = '${message.author.id}';`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`**Winner!** The color landed on **${color}**, your bet has been multiplied by **15x**`)
                        ]
                    })
                } else if (color == 'Black' && colorbet == 'black') {
                    let money = bet * 2;
                    con.query(`UPDATE business SET businessBalance = businessBalance + ${money} WHERE userId = '${message.author.id}';`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`**Winner!** The color landed on **${color}**, your bet has been multiplied by **2x**`)
                        ]
                    })
                } else {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`**Loser!** The color landed on **${color}**...`)
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