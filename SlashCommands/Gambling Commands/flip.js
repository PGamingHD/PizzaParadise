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
        name: 'flip',
        description: 'Flip a coin and see if you have what it takes to win!',
        type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
        required: true,
        options: [{
                name: 'heads',
                description: 'Put your money into Heads!',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                options: [{
                    name: 'bet',
                    description: 'How much money would you like to bet on this side?',
                    type: Constants.ApplicationCommandOptionTypes.NUMBER,
                    required: true
                }]
            },
            {
                name: 'tails',
                description: 'Put your money into Tails!',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                options: [{
                    name: 'bet',
                    description: 'How much money would you like to bet on this side?',
                    type: Constants.ApplicationCommandOptionTypes.NUMBER,
                    required: true
                }]
            },
        ],
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args, con) => {
            if (interaction.options.getSubcommand() === 'heads') {
                //return console.log(args[1])
                con.query(`SELECT * FROM business LEFT JOIN premiumuser ON business.userId = premiumuser.userId WHERE business.userId = '${interaction.user.id}'`, async function (error, results, fields) {
                    if (error) throw error;
                    if (results && results.length) {
                        let bet = args[1];
                        if (results[0].premiumLevel === 0) {
                            if (bet < 10 || bet > 5000) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`Please select a valid bet between **$10** - **$5,000**!\n\nHint: Did you know that you can purchase a rank to get a higher bet max?`)
                                    ],
                                    ephemeral: true
                                })
                            }
                        } else if (results[0].premiumLevel === 1) {
                            if (bet < 10 || bet > 8000) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`Please select a valid bet between **$10** - **$8,000**!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                        } else if (results[0].premiumLevel === 2) {
                            if (bet < 10 || bet > 20000) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`Please select a valid bet between **$10** - **$20,000**!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                        } else if (results[0].premiumLevel === 3) {
                            if (bet < 10 || bet > 50000) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`Please select a valid bet between **$10** - **$50,000**!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                        } else if (results[0].premiumLevel === 4) {
                            if (bet < 10 || bet > 100000) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`Please select a valid bet between **$10** - **$100,000**!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                        } else if (results[0].premiumLevel === 5) {
                            if (bet < 10 || bet > 250000) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`Please select a valid bet between **$10** - **$250,000**!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                        }
                        let inputvalue = 1;
                        const randomizer = Math.floor(Math.random() * 2 + 1);
                        if (randomizer == inputvalue) {
                            con.query(`UPDATE business SET businessBalance = businessBalance + ${bet} WHERE userId = '${interaction.user.id}';`)
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} **Heads**! You won $${bet.toLocaleString('en-US')}!`)
                                    .setFooter(interaction.user.tag)
                                ]
                            })
                        } else {
                            con.query(`UPDATE business SET businessBalance = businessBalance - ${bet} WHERE userId = '${interaction.user.id}';`)
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} **Tails**! You lost $${bet.toLocaleString('en-US')}!`)
                                    .setFooter(interaction.user.tag)
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

            if (interaction.options.getSubcommand() === 'tails') {

                con.query(`SELECT * FROM business LEFT JOIN premiumuser ON business.userId = premiumuser.userId WHERE business.userId = '${interaction.user.id}'`, async function (error, results, fields) {
                    if (error) throw error;
                    if (results && results.length) {
                        let bet = args[1];
                        if (results[0].premiumLevel === 0) {
                            if (bet < 10 || bet > 5000) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`Please select a valid bet between **$10** - **$5,000**!\n\nHint: Did you know that you can purchase a rank to get a higher bet max?`)
                                    ],
                                    ephemeral: true
                                })
                            }
                        } else if (results[0].premiumLevel === 1) {
                            if (bet < 10 || bet > 8000) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`Please select a valid bet between **$10** - **$8,000**!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                        } else if (results[0].premiumLevel === 2) {
                            if (bet < 10 || bet > 20000) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`Please select a valid bet between **$10** - **$20,000**!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                        } else if (results[0].premiumLevel === 3) {
                            if (bet < 10 || bet > 50000) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`Please select a valid bet between **$10** - **$50,000**!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                        } else if (results[0].premiumLevel === 4) {
                            if (bet < 10 || bet > 100000) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`Please select a valid bet between **$10** - **$100,000**!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                        } else if (results[0].premiumLevel === 5) {
                            if (bet < 10 || bet > 250000) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`Please select a valid bet between **$10** - **$250,000**!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                        }
                        let inputvalue = 2;
                        const randomizer = Math.floor(Math.random() * 2 + 1);
                        if (randomizer == inputvalue) {
                            con.query(`UPDATE business SET businessBalance = businessBalance + ${bet} WHERE userId = '${interaction.user.id}';`)
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} **Tails**! You won $${bet.toLocaleString('en-US')}!`)
                                    .setFooter(interaction.user.tag)
                                ]
                            })
                        } else {
                            con.query(`UPDATE business SET businessBalance = businessBalance - ${bet} WHERE userId = '${interaction.user.id}';`)
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} **Heads**! You lost $${bet.toLocaleString('en-US')}!`)
                                    .setFooter(interaction.user.tag)
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
    }

    /*

    Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
    Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
    Other than that, please do note that it is required if you are using this to mention the original developer
    Original Developer - PGamingHD#0666
    
    */