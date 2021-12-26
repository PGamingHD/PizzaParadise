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
        name: 'bake',
        description: 'Bake your pizzas and or dough that you have collected ingredients for!',
        options: [{
            name: 'type',
            description: 'What type of item do you wish to bake?',
            type: Constants.ApplicationCommandOptionTypes.STRING,
            required: true,
        }, {
            name: 'amount',
            description: 'How much do you wish to bake?',
            type: Constants.ApplicationCommandOptionTypes.INTEGER,
            required: true
        }],
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args, con) => {
            con.query(`SELECT * FROM business LEFT JOIN userinventory ON business.userId = userinventory.userId LEFT JOIN cmdcooldowns ON business.userId = cmdcooldowns.userId LEFT JOIN ownedrecipes ON business.userId = ownedrecipes.userId WHERE business.userId = '${interaction.user.id}'`, async (error, results, fields) => {
                if (error) throw error;
                if (results && results.length) {
                    let cooldown = 905000;
                    if (Date.now() >= results[0].bakecooldown + cooldown || results[0].bakecooldown == 0) {
                        if (!args[0]) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} Please enter a valid ID!`)
                                ]
                            })
                        }
                        let pizzatype = args[0].toLowerCase();

                        if (pizzatype === 'dough') {
                            if (results[0].recipeDough !== 1) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You cannot bake something you do not have a recipe for, purchase it first.`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            let quantity = args[1];

                            if (quantity === undefined || quantity < 0) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You must bake a positive amount!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (quantity > 100) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may only bake **100** pieces of dough per round!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (results[0].yeast < quantity || results[0].salt < quantity || results[0].sugar < quantity || results[0].flour < quantity) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may not bake more dough than you have ingredients for.`)
                                    ],
                                    ephemeral: true
                                })
                            }

                            //BAKE FUNCTION
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`Baking dough, the dough should be finished in 15 minutes!`)
                                ]
                            })

                            //SET COOLDOWN FOR CMD!
                            con.query(`UPDATE cmdcooldowns SET bakecooldown = ${Date.now()} WHERE userId = '${interaction.user.id}'`);
                            //SET COOLDOWN FOR CMD!

                            setTimeout(() => {
                                interaction.editReply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} **${quantity}** Dough successfully baked, baker has been notified.`)
                                    ]
                                })
                                interaction.user.send({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} Your **${quantity}** dough was successfully baked and is now ready to be used!`)
                                    ]
                                })

                                con.query(`UPDATE userinventory SET dough = dough + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET yeast = yeast - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET salt = salt - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET sugar = sugar - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET flour = flour - ${quantity} WHERE userId = '${interaction.user.id}';`)
                            }, 1000 * 60 * 15);
                        }

                        //NEW

                        if (pizzatype === 'margherita') {
                            if (results[0].recipeMargherita !== 1) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You cannot bake something you do not have a recipe for, purchase it first.`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            let quantity = args[1];

                            if (quantity === undefined || quantity < 0) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You must bake a positive amount!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (quantity > 100) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may only bake **100** pizzas per round!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (results[0].dough < quantity || results[0].cheese < quantity || results[0].sauce < quantity) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may not bake more pizzas than you have ingredients for.`)
                                    ],
                                    ephemeral: true
                                })
                            }

                            //BAKE FUNCTION
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`Baking pizza(s), the pizza(s) should be finished in 15 minutes!`)
                                ]
                            })

                            //SET COOLDOWN FOR CMD!
                            con.query(`UPDATE cmdcooldowns SET bakecooldown = ${Date.now()} WHERE userId = '${interaction.user.id}'`);
                            //SET COOLDOWN FOR CMD!

                            setTimeout(() => {
                                interaction.editReply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} **${quantity}** Pizza(s) successfully baked, baker has been notified.`)
                                    ]
                                })
                                interaction.user.send({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} Your **${quantity}** Pizza(s) has been successfully baked and is now ready to be sold!`)
                                    ]
                                })

                                con.query(`UPDATE userinventory SET margheritap = margheritap + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET dough = dough - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET cheese = cheese - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET sauce = sauce - ${quantity} WHERE userId = '${interaction.user.id}';`)
                            }, 1000 * 60 * 15);
                        }

                        //NEW

                        if (pizzatype === 'hawaiian') {
                            if (results[0].recipeHawaiian !== 1) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You cannot bake something you do not have a recipe for, purchase it first.`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            let quantity = args[1];

                            if (quantity === undefined || quantity < 0) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You must bake a positive amount!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (quantity > 100) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may only bake **100** pizzas per round!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (results[0].dough < quantity || results[0].cheese < quantity || results[0].sauce < quantity || results[0].pineapple < quantity || results[0].ham < quantity) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may not bake more pizzas than you have ingredients for.`)
                                    ],
                                    ephemeral: true
                                })
                            }

                            //BAKE FUNCTION
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`Baking pizza(s), the pizza(s) should be finished in 15 minutes!`)
                                ]
                            })

                            //SET COOLDOWN FOR CMD!
                            con.query(`UPDATE cmdcooldowns SET bakecooldown = ${Date.now()} WHERE userId = '${interaction.user.id}'`);
                            //SET COOLDOWN FOR CMD!

                            setTimeout(() => {
                                interaction.editReply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} **${quantity}** Pizza(s) successfully baked, baker has been notified.`)
                                    ]
                                })
                                interaction.user.send({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} Your **${quantity}** Pizza(s) has been successfully baked and is now ready to be sold!`)
                                    ]
                                })

                                con.query(`UPDATE userinventory SET hawaiianp = hawaiianp + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET dough = dough - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET cheese = cheese - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET sauce = sauce - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET pineapple = pineapple - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET ham = ham - ${quantity} WHERE userId = '${interaction.user.id}';`)
                            }, 1000 * 60 * 15);
                        }

                        //NEW

                        if (pizzatype === 'pepperoni') {
                            if (results[0].recipePepperoni !== 1) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You cannot bake something you do not have a recipe for, purchase it first.`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            let quantity = args[1];

                            if (quantity === undefined || quantity < 0) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You must bake a positive amount!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (quantity > 100) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may only bake **100** pizzas per round!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (results[0].dough < quantity || results[0].cheese < quantity || results[0].sauce < quantity || results[0].pepperoni < quantity) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may not bake more pizzas than you have ingredients for.`)
                                    ],
                                    ephemeral: true
                                })
                            }

                            //BAKE FUNCTION
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`Baking pizza(s), the pizza(s) should be finished in 15 minutes!`)
                                ]
                            })

                            //SET COOLDOWN FOR CMD!
                            con.query(`UPDATE cmdcooldowns SET bakecooldown = ${Date.now()} WHERE userId = '${interaction.user.id}'`);
                            //SET COOLDOWN FOR CMD!

                            setTimeout(() => {
                                interaction.editReply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} **${quantity}** Pizza(s) successfully baked, baker has been notified.`)
                                    ]
                                })
                                interaction.user.send({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} Your **${quantity}** Pizza(s) has been successfully baked and is now ready to be sold!`)
                                    ]
                                })

                                con.query(`UPDATE userinventory SET pepperonip = pepperonip + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET dough = dough - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET cheese = cheese - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET sauce = sauce - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET pepperoni = pepperoni - ${quantity} WHERE userId = '${interaction.user.id}';`)
                            }, 1000 * 60 * 15);
                        }

                        //NEW

                        if (pizzatype === 'habanero') {
                            if (results[0].recipeHabanero !== 1) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You cannot bake something you do not have a recipe for, purchase it first.`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            let quantity = args[1];

                            if (quantity === undefined || quantity < 0) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You must bake a positive amount!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (quantity > 100) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may only bake **100** pizzas per round!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (results[0].dough < quantity || results[0].cheese < quantity || results[0].sauce < quantity || results[0].pepper < quantity) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may not bake more pizzas than you have ingredients for.`)
                                    ],
                                    ephemeral: true
                                })
                            }

                            //BAKE FUNCTION
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`Baking pizza(s), the pizza(s) should be finished in 15 minutes!`)
                                ]
                            })

                            //SET COOLDOWN FOR CMD!
                            con.query(`UPDATE cmdcooldowns SET bakecooldown = ${Date.now()} WHERE userId = '${interaction.user.id}'`);
                            //SET COOLDOWN FOR CMD!

                            setTimeout(() => {
                                interaction.editReply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} **${quantity}** Pizza(s) successfully baked, baker has been notified.`)
                                    ]
                                })
                                interaction.user.send({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} Your **${quantity}** Pizza(s) has been successfully baked and is now ready to be sold!`)
                                    ]
                                })

                                con.query(`UPDATE userinventory SET habanerop = habanerop + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET dough = dough - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET cheese = cheese - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET sauce = sauce - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET pepper = pepper - ${quantity} WHERE userId = '${interaction.user.id}';`)
                            }, 1000 * 60 * 15);
                        }

                        //NEW

                        if (pizzatype === 'bacon') {
                            if (results[0].recipeBacon !== 1) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You cannot bake something you do not have a recipe for, purchase it first.`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            let quantity = args[1];

                            if (quantity === undefined || quantity < 0) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You must bake a positive amount!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (quantity > 100) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may only bake **100** pizzas per round!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (results[0].dough < quantity || results[0].cheese < quantity || results[0].sauce < quantity || results[0].bacon < quantity) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may not bake more pizzas than you have ingredients for.`)
                                    ],
                                    ephemeral: true
                                })
                            }

                            //BAKE FUNCTION
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`Baking pizza(s), the pizza(s) should be finished in 15 minutes!`)
                                ]
                            })

                            //SET COOLDOWN FOR CMD!
                            con.query(`UPDATE cmdcooldowns SET bakecooldown = ${Date.now()} WHERE userId = '${interaction.user.id}'`);
                            //SET COOLDOWN FOR CMD!

                            setTimeout(() => {
                                interaction.editReply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} **${quantity}** Pizza(s) successfully baked, baker has been notified.`)
                                    ]
                                })
                                interaction.user.send({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} Your **${quantity}** Pizza(s) has been successfully baked and is now ready to be sold!`)
                                    ]
                                })

                                con.query(`UPDATE userinventory SET baconp = baconp + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET dough = dough - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET cheese = cheese - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET sauce = sauce - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET bacon = bacon - ${quantity} WHERE userId = '${interaction.user.id}';`)
                            }, 1000 * 60 * 15);
                        }

                        //NEW

                        if (pizzatype === 'chicken') {
                            if (results[0].recipeChicken !== 1) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You cannot bake something you do not have a recipe for, purchase it first.`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            let quantity = args[1];

                            if (quantity === undefined || quantity < 0) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You must bake a positive amount!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (quantity > 100) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may only bake **100** pizzas per round!`)
                                    ],
                                    ephemeral: true
                                })
                            }
                            if (results[0].dough < quantity || results[0].cheese < quantity || results[0].sauce < quantity || results[0].chicken < quantity || results[0].garlic < quantity) {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`${emoji.error} You may not bake more pizzas than you have ingredients for.`)
                                    ],
                                    ephemeral: true
                                })
                            }

                            //BAKE FUNCTION
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`Baking pizza(s), the pizza(s) should be finished in 15 minutes!`)
                                ]
                            })

                            //SET COOLDOWN FOR CMD!
                            con.query(`UPDATE cmdcooldowns SET bakecooldown = ${Date.now()} WHERE userId = '${interaction.user.id}'`);
                            //SET COOLDOWN FOR CMD!

                            setTimeout(() => {
                                interaction.editReply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} **${quantity}** Pizza(s) successfully baked, baker has been notified.`)
                                    ]
                                })
                                interaction.user.send({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`${emoji.success} Your **${quantity}** Pizza(s) has been successfully baked and is now ready to be sold!`)
                                    ]
                                })

                                con.query(`UPDATE userinventory SET chickenp = chickenp + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET dough = dough - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET cheese = cheese - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET sauce = sauce - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET chicken = chicken - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE userinventory SET garlic = garlic - ${quantity} WHERE userId = '${interaction.user.id}';`)
                            }, 1000 * 60 * 15);
                        }
                    } else {
                        let cooldown = 905000;
                        const timetobe = results[0].bakecooldown + cooldown;
                        const timenow = Date.now();
                        const timeleft = timetobe - timenow
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You are tired from your earlier baking session!\nPlease wait another **${prettyMilliseconds(timeleft)}** before baking again.`)
                            ]
                        })
                    }
                } else {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`${emoji.error} You do not yet have a business registered.\nRegister a business with the \`${prefix}register\` command!`)
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