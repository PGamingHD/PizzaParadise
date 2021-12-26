    const {
        Client,
        CommandInteraction,
        MessageEmbed,
        MessageActionRow,
        MessageButton,
        Constants
    } = require('discord.js');
    const ee = require('../../botconfig/embed.json');
    const emoji = require('../../botconfig/emojis.json')
    const prettyMilliseconds = require('pretty-ms');
    const config = require('../../botconfig/config.json')

    module.exports = {
        name: 'roulette',
        description: 'Play some roulette!',
        type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
        required: true,
        options: [{
            name: 'red',
            description: 'Put your money into the red color and see what happens!',
            type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [{
                name: 'bet',
                description: 'How much money would you like to bet on this color?',
                type: Constants.ApplicationCommandOptionTypes.NUMBER,
                required: true
            }]
        }, {
            name: 'black',
            description: 'Put your money into the black color and see what happens!',
            type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [{
                name: 'bet',
                description: 'How much money would you like to bet on this color?',
                type: Constants.ApplicationCommandOptionTypes.NUMBER,
                required: true
            }]
        }, {
            name: 'green',
            description: 'Put your money into the green color and see what happens!',
            type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [{
                name: 'bet',
                description: 'How much money would you like to bet on this color?',
                type: Constants.ApplicationCommandOptionTypes.NUMBER,
                required: true
            }]
        }],
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args, con) => {
            con.query(`SELECT * FROM business LEFT JOIN premiumuser ON business.userId = premiumuser.userId WHERE business.userId = '${interaction.user.id}';`, function (error, results, fields) {
                if (error) throw error;
                if (results && results.length) {
                    let randomizer = Math.floor(Math.random() * (0 - 14) + 14);
                    let color = undefined;
                    const bet = args[1];
                    if (results[0].premiumLevel === 0) {
                        if (bet < 10 || bet > 5000) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`Please select a valid bet between **$10** - **$5,000**!\n\nHint: Did you know that you can purchase a rank to get a higher bet max?`)
                                ]
                            })
                        }
                    } else if (results[0].premiumLevel === 1) {
                        if (bet < 10 || bet > 8000) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`Please select a valid bet between **$10** - **$8,000**!`)
                                ]
                            })
                        }
                    } else if (results[0].premiumLevel === 2) {
                        if (bet < 10 || bet > 20000) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`Please select a valid bet between **$10** - **$20,000**!`)
                                ]
                            })
                        }
                    } else if (results[0].premiumLevel === 3) {
                        if (bet < 10 || bet > 50000) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`Please select a valid bet between **$10** - **$50,000**!`)
                                ]
                            })
                        }
                    } else if (results[0].premiumLevel === 4) {
                        if (bet < 10 || bet > 100000) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`Please select a valid bet between **$10** - **$100,000**!`)
                                ]
                            })
                        }
                    } else if (results[0].premiumLevel === 5) {
                        if (bet < 10 || bet > 250000) {
                            return interaction.reply({
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

                    con.query(`UPDATE business SET businessBalance = businessBalance - ${bet} WHERE userId = '${interaction.user.id}';`)

                    if (color == 'Red' && args[0] == 'red') {
                        let money = bet * 1.5;
                        con.query(`UPDATE business SET businessBalance = businessBalance + ${money} WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`**Winner!** The color landed on **${color}**, your bet has been multiplied by **1.5x**`)
                            ]
                        })
                    } else if (color == 'Green' && args[0] == 'green') {
                        let money = bet * 15;
                        con.query(`UPDATE business SET businessBalance = businessBalance + ${money} WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`**Winner!** The color landed on **${color}**, your bet has been multiplied by **15x**`)
                            ]
                        })
                    } else if (color == 'Black' && args[0] == 'black') {
                        let money = bet * 2;
                        con.query(`UPDATE business SET businessBalance = businessBalance + ${money} WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`**Winner!** The color landed on **${color}**, your bet has been multiplied by **2x**`)
                            ]
                        })
                    } else {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`**Loser!** The color landed on **${color}**...`)
                            ]
                        })
                    }
                } else {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`You do not yet have a business registered.\nRegister a business with the \`/register\` command!`)
                        ]
                    })
                }
            });
        }
    }

    /*

    Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
    Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
    Other than that, please do note that it is required if you are using this to mention the original developer
    Original Developer - PGamingHD#0666
    
    */