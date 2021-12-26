const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json")
const ee = require("../../botconfig/embed.json");
const {
    api
} = require("../../index");

module.exports = {
    name: "tutorial", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    //aliases: ['bottutorial', 'tutorialcmd', 'viewtutorial'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`Pizza Paradise Tutorial`)
                .setDescription(`📚 New to PizzaParadise? Need some extra help along your journey? Start this tutorial by responding with \`start\`!`)
            ]
        })

        let collector = undefined;


        collector = message.channel.createMessageCollector({
            time: 150000
        })

        collector.on('collect', async (msg) => {
            con.query(`SELECT * FROM business WHERE userId = '${message.author.id}'`, function (error, results, fields) {
                if (error) throw error;
                if (results && results.length) {
                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `start`) {
                        message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setTitle(`📚 Why not check your profile out before continuing?`)
                                .setDescription(`Run the command \`${prefix}profile\` to check it out!`)
                                .setFooter(`Type "stop" to stop the tutorial`)
                            ]
                        })
                    }

                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}profile`) {
                        setTimeout(() => {
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setTitle(`📚 This is your profile menu, anything that has with your account to do is displayed here!`)
                                    .setDescription(`${emoji.currency} **Profile Balance:** Your own balance, no one could access this other than you! Use this to purchase some personal stuff!\n${emoji.uparrow} **Owned Business:** Your personal business registered on your account, take care of this!\n${emoji.bitcoin} **Crypto Wallet:** Crypto wallet!? Collect different crypto currency and trade them with other players and become a crypto collector!\n\nWhy not check your business out aswell while at it? run \`${prefix}business\` to continue!`)
                                    .setFooter(`Type "stop" to stop the tutorial`)
                                ]
                            })
                        }, 500);
                    }

                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}business`) {
                        setTimeout(() => {
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setTitle(`📚 This is your business menu, find anything that has to do with your business here!`)
                                    .setDescription(`${emoji.currency} **Business Balance:** Your business balance, use this to purchase stock, purchase recipes and much more!\n${emoji.booster} **Booster:** This is your money booster, this will be used later for prestiges!\n**Business Rank:** Get your own business rank, and it will be displayed here!\n\nCheck your recipes out now, run \`${prefix}recipe\`!`)
                                    .setFooter(`Type "stop" to stop the tutorial`)
                                ]
                            })
                        }, 500);
                    }
                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}recipe`) {
                        setTimeout(() => {
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setTitle(`📚 Your recipe page!`)
                                    .setDescription(`This is your **recipe** page, used to display all recipes used for different pizza kinds! You can purchase new ones from the shop.\n\nNow finally, check out the shop with \`${prefix}shop\`!`)
                                    .setFooter(`Type "stop" to stop the tutorial`)
                                ]
                            })
                        }, 500);
                    }
                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}shop`) {
                        setTimeout(() => {
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setTitle(`📚 Finally, the shop!`)
                                    .setDescription(`Now finally, the shop! This is used and is very important. This is where you'll be purchasing all your pizza recipes, purchase better pizza recipes and collect ingredients to sell them for so much more!\n\nNow finally, run the \`${prefix}bake\` command to check out the baking command!`)
                                    .setFooter(`Type "stop" to stop the tutorial`)
                                ]
                            })
                        }, 500);
                    }
                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}bake`) {
                        setTimeout(() => {
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setTitle(`📚 Now baking your pizzas!`)
                                    .setDescription(`This is what it is all about, baking your own pizzas... You bake pizzas with the command \`${prefix}bake [Type] [Amount]\`! Example: \`${prefix}bake margherita 5\` to bake 5 Margheritas! This is how you make your money, then sell it with \`${prefix}sell margherita 5\` to sell them afterwards!\nNow finally, run \`${prefix}inventory\` to finish this tutorial!`)
                                    .setFooter(`Type "stop" to stop the tutorial`)
                                ]
                            })
                        }, 500);
                    }
                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}inventory`) {
                        setTimeout(() => {
                            return collector.stop();
                        }, 500);
                    }

                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === 'stop') {
                        return collector.stop();
                    }

                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}tutorial`) {
                        return collector.stop();
                    }
                } else {

                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `start`) {
                        message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setTitle(`📚 First things first, you have to __register__ your business!`)
                                .setDescription(`Run the command \`${prefix}register\` to register your Business.`)
                                .setFooter(`Type "stop" to stop the tutorial`)
                            ]
                        })
                    }

                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}register`) {
                        setTimeout(() => {
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setTitle(`📚 Check the new business out!`)
                                    .setDescription(`Run the command \`${prefix}business\` to check it out!`)
                                    .setFooter(`Type "stop" to stop the tutorial`)
                                ]
                            })
                        }, 500);
                    }

                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}business`) {
                        setTimeout(() => {
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setTitle(`📚 This is your business menu, find anything that has to do with your business here!`)
                                    .setDescription(`${emoji.currency} **Business Balance:** Your business balance, use this to purchase stock, purchase recipes and much more!\n${emoji.booster} **Booster:** This is your money booster, this will be used later for prestiges!\n**Business Rank:** Get your own business rank, and it will be displayed here!\n\nCheck your profile out now, run \`${prefix}profile\`!`)
                                    .setFooter(`Type "stop" to stop the tutorial`)
                                ]
                            })
                        }, 500);
                    }

                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}profile`) {
                        setTimeout(() => {
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setTitle(`📚 This is your profile menu, anything that has with your account to do is displayed here!`)
                                    .setDescription(`${emoji.currency} **Profile Balance:** Your own balance, no one could access this other than you! Use this to purchase some personal stuff!\n${emoji.uparrow} **Owned Business:** Your personal business registered on your account, take care of this!\n${emoji.bitcoin} **Crypto Wallet:** Crypto wallet!? Collect different crypto currency and trade them with other players and become a crypto collector!\n\nCheck your recipes out now, run \`${prefix}recipe\`!`)
                                    .setFooter(`Type "stop" to stop the tutorial`)
                                ]
                            })
                        }, 500);
                    }
                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}recipe`) {
                        setTimeout(() => {
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setTitle(`📚 Your recipe page!`)
                                    .setDescription(`This is your **recipe** page, used to display all recipes used for different pizza kinds! You can purchase new ones from the shop.\n\nNow finally, check out the shop with \`${prefix}shop\`!`)
                                    .setFooter(`Type "stop" to stop the tutorial`)
                                ]
                            })
                        }, 500);
                    }
                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}shop`) {
                        setTimeout(() => {
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setTitle(`📚 Finally, the shop!`)
                                    .setDescription(`Now finally, the shop! This is used and is very important. This is where you'll be purchasing all your pizza recipes, purchase better pizza recipes and collect ingredients to sell them for so much more!\n\nNow finally, run the \`${prefix}bake\` command to check out the baking command!`)
                                    .setFooter(`Type "stop" to stop the tutorial`)
                                ]
                            })
                        }, 500);
                    }
                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}bake`) {
                        setTimeout(() => {
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setTitle(`📚 Now baking your pizzas!`)
                                    .setDescription(`This is what it is all about, baking your own pizzas... You bake pizzas with the command \`${prefix}bake [Type] [Amount]\`! Example: \`${prefix}bake margherita 5\` to bake 5 Margheritas! This is how you make your money, then sell it with \`${prefix}sell margherita 5\` to sell them afterwards!\nNow finally, run \`${prefix}inventory\` to finish this tutorial!`)
                                    .setFooter(`Type "stop" to stop the tutorial`)
                                ]
                            })
                        }, 500);
                    }
                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}inventory`) {
                        setTimeout(() => {
                            return collector.stop();
                        }, 500);
                    }

                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === 'stop') {
                        return collector.stop();
                    }

                    if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `${prefix}tutorial`) {
                        return collector.stop();
                    }
                }
            })
        })

        collector.on('end', collected => {
            let allmsgs = collected.map(message => `${message}`).join(`, `);
            if (allmsgs.toLowerCase().includes("stop".toLowerCase())) {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`${emoji.success} Stopped tutorial!`)
                    ]
                })
            } else if (allmsgs.toLowerCase().includes(`${prefix}tutorial`.toLowerCase())) {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`There was a tutorial running, stopped that one and will restart a new one.`)
                    ]
                })
            } else if (allmsgs.toLowerCase().includes(`${prefix}inventory`)) {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`📚 The basics are now over!`)
                        .setDescription(`👋 Now to the inventory, you have two different inventories... \`pizza\` and your \`ingredient\` inventory. Pretty self explanatory what these do, open your inventory to check what you have in stock!\n\nNow you know most of the basics of PizzaParadise, so you should be ready on your new adventure.\n\nNeed more help? Join our support server by using the \`${prefix}support\` command!`)
                        .setFooter(`Good luck on your adventure!`, ee.footericon)
                    ]
                })
            } else {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`${emoji.error} Tutorial timed out!`)
                    ]
                })
            }
        })
    },
};

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/