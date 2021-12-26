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
        name: 'sell',
        description: 'Sell something from your inventory to your customers!',
        options: [{
            name: 'item',
            description: 'What item do you wish to sell?',
            type: Constants.ApplicationCommandOptionTypes.STRING,
            required: true,
        }, {
            name: 'amount',
            description: 'How much of the specific item do you wish to sell?',
            type: Constants.ApplicationCommandOptionTypes.INTEGER,
        }],
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args, con) => {
            con.query(`SELECT * FROM business LEFT JOIN userinventory ON business.userId = userinventory.userId LEFT JOIN cryptowallet ON business.userId = cryptowallet.userId LEFT JOIN cryptobitcoin ON business.access = cryptobitcoin.access LEFT JOIN cryptoethereum ON business.access = cryptoethereum.access LEFT JOIN cryptolitecoin ON business.access = cryptolitecoin.access WHERE business.userId = '${interaction.user.id}'`, function (error, results, fields) {
                if (error) throw error;
                if (results && results.length) {
                    if (!args[0]) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please enter a valid ID!`)
                            ]
                        })
                    }

                    const sellableIDs = [
                        "margherita",
                        "hawaiian",
                        "pepperoni",
                        "habanero",
                        "bacon",
                        "chicken",
                        "bitcoin",
                        "ethereum",
                        "litecoin"
                    ]
                    let pizzatype = args[0].toLowerCase();

                    if (!sellableIDs.includes(pizzatype)) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please use a valid ID!`),
                            ],
                            ephemeral: true
                        });
                    }

                    if (pizzatype === 'margherita') {
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
                        if (results[0].margheritap < quantity) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} You may not sell more pizzas than you have.`)
                                ],
                                ephemeral: true
                            })
                        }
                        let randomizedtipornot = Math.floor(Math.random() * (10 - 1) + 1);

                        if (randomizedtipornot < 5) {
                            let percentage = Math.floor(Math.random() * (10 - 1) + 1);
                            let moneyearned = quantity * 750 * results[0].businessBooster;
                            let tip = percentage / 100 * moneyearned;
                            let tipfix = Math.floor(tip);

                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You successfully sold \`${quantity.toLocaleString('en-US')}\` Margherita Pizzas and earned \`$${moneyearned.toLocaleString('en-US')}\`!\n\nOntop of that a customer left a tip containing a \`${percentage}%\` tip total to \`$${tipfix.toLocaleString('en-US')}\` for the service!`)
                                ]
                            })
                            con.query(`UPDATE userinventory SET margheritap = margheritap - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + 750 * ${quantity} * ${results[0].businessBooster} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessProduced = businessProduced + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + ${tipfix} WHERE userId = '${interaction.user.id}';`)
                            return;
                        }
                        if (randomizedtipornot >= 5) {
                            let moneyearned = quantity * 750 * results[0].businessBooster;

                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You successfully sold \`${quantity.toLocaleString('en-US')}\` pizzas and earned \`$${moneyearned.toLocaleString('en-US')}\`!`)
                                ]
                            })
                            con.query(`UPDATE userinventory SET margheritap = margheritap - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + 750 * ${quantity} * ${results[0].businessBooster} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessProduced = businessProduced + ${quantity} WHERE userId = '${interaction.user.id}';`)
                            return;
                        }
                    }

                    //NEW

                    if (pizzatype === 'hawaiian') {
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
                        if (results[0].hawaiianp < quantity) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} You may not sell more pizzas than you have.`)
                                ],
                                ephemeral: true
                            })
                        }
                        let randomizedtipornot = Math.floor(Math.random() * (10 - 1) + 1);

                        if (randomizedtipornot <= 7) {
                            let percentage = Math.floor(Math.random() * (10 - 1) + 1);
                            let moneyearned = quantity * 2500 * results[0].businessBooster;
                            let tip = percentage / 100 * moneyearned;
                            let tipfix = Math.floor(tip);

                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You successfully sold \`${quantity.toLocaleString('en-US')}\` Hawaiian Pizza(s) and earned \`$${moneyearned.toLocaleString('en-US')}\`!\n\nOntop of that a customer left a tip containing a \`${percentage}%\` tip total to \`$${tipfix.toLocaleString('en-US')}\` for the service!`)
                                ]
                            })
                            con.query(`UPDATE userinventory SET hawaiianp = hawaiianp - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + 2500 * ${quantity} * ${results[0].businessBooster} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessProduced = businessProduced + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + ${tipfix} WHERE userId = '${interaction.user.id}';`)
                            return;
                        }
                        if (randomizedtipornot > 7) {
                            let moneyearned = quantity * 2500 * results[0].businessBooster;

                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You successfully sold \`${quantity.toLocaleString('en-US')}\` Hawaiian Pizza(s) and earned \`$${moneyearned.toLocaleString('en-US')}\`!`)
                                ]
                            })
                            con.query(`UPDATE userinventory SET hawaiianp = hawaiianp - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + 2500 * ${quantity} * ${results[0].businessBooster} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessProduced = businessProduced + ${quantity} WHERE userId = '${interaction.user.id}';`)
                            return;
                        }
                    }

                    //NEW

                    if (pizzatype === 'pepperoni') {
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
                        if (results[0].pepperonip < quantity) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} You may not sell more pizzas than you have.`)
                                ],
                                ephemeral: true
                            })
                        }
                        let randomizedtipornot = Math.floor(Math.random() * (10 - 1) + 1);

                        if (randomizedtipornot <= 7) {
                            let percentage = Math.floor(Math.random() * (10 - 1) + 1);
                            let moneyearned = quantity * 3500 * results[0].businessBooster;
                            let tip = percentage / 100 * moneyearned;
                            let tipfix = Math.floor(tip);

                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You successfully sold \`${quantity.toLocaleString('en-US')}\` Pepperoni Pizza(s) and earned \`$${moneyearned.toLocaleString('en-US')}\`!\n\nOntop of that a customer left a tip containing a \`${percentage}%\` tip total to \`$${tipfix.toLocaleString('en-US')}\` for the service!`)
                                ]
                            })
                            con.query(`UPDATE userinventory SET pepperonip = pepperonip - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + 3500 * ${quantity} * ${results[0].businessBooster} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessProduced = businessProduced + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + ${tipfix} WHERE userId = '${interaction.user.id}';`)
                            return;
                        }
                        if (randomizedtipornot > 7) {
                            let moneyearned = quantity * 3500 * results[0].businessBooster;

                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You successfully sold \`${quantity.toLocaleString('en-US')}\` Pepperoni Pizza(s) and earned \`$${moneyearned.toLocaleString('en-US')}\`!`)
                                ]
                            })
                            con.query(`UPDATE userinventory SET pepperonip = pepperonip - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + 3500 * ${quantity} * ${results[0].businessBooster} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessProduced = businessProduced + ${quantity} WHERE userId = '${interaction.user.id}';`)
                            return;
                        }
                    }

                    //NEW

                    if (pizzatype === 'habanero') {
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
                        if (results[0].habanerop < quantity) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} You may not sell more pizzas than you have.`)
                                ],
                                ephemeral: true
                            })
                        }
                        let randomizedtipornot = Math.floor(Math.random() * (10 - 1) + 1);

                        if (randomizedtipornot <= 7) {
                            let percentage = Math.floor(Math.random() * (10 - 1) + 1);
                            let moneyearned = quantity * 5000 * results[0].businessBooster;
                            let tip = percentage / 100 * moneyearned;
                            let tipfix = Math.floor(tip);

                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You successfully sold \`${quantity.toLocaleString('en-US')}\` Habanero Pizza(s) and earned \`$${moneyearned.toLocaleString('en-US')}\`!\n\nOntop of that a customer left a tip containing a \`${percentage}%\` tip total to \`$${tipfix.toLocaleString('en-US')}\` for the service!`)
                                ]
                            })
                            con.query(`UPDATE userinventory SET habanerop = habanerop - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + 5000 * ${quantity} * ${results[0].businessBooster} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessProduced = businessProduced + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + ${tipfix} WHERE userId = '${interaction.user.id}';`)
                            return;
                        }
                        if (randomizedtipornot > 7) {
                            let moneyearned = quantity * 5000 * results[0].businessBooster;

                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You successfully sold \`${quantity.toLocaleString('en-US')}\` Habanero Pizza(s) and earned \`$${moneyearned.toLocaleString('en-US')}\`!`)
                                ]
                            })
                            con.query(`UPDATE userinventory SET habanerop = habanerop - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + 5000 * ${quantity} * ${results[0].businessBooster} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessProduced = businessProduced + ${quantity} WHERE userId = '${interaction.user.id}';`)
                            return;
                        }
                    }

                    //NEW

                    if (pizzatype === 'bacon') {
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
                        if (results[0].baconp < quantity) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} You may not sell more pizzas than you have.`)
                                ],
                                ephemeral: true
                            })
                        }
                        let randomizedtipornot = Math.floor(Math.random() * (10 - 1) + 1);

                        if (randomizedtipornot <= 7) {
                            let percentage = Math.floor(Math.random() * (10 - 1) + 1);
                            let moneyearned = quantity * 7500 * results[0].businessBooster;
                            let tip = percentage / 100 * moneyearned;
                            let tipfix = Math.floor(tip);

                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You successfully sold \`${quantity.toLocaleString('en-US')}\` Bacon Pizza(s) and earned \`$${moneyearned.toLocaleString('en-US')}\`!\n\nOntop of that a customer left a tip containing a \`${percentage}%\` tip total to \`$${tipfix.toLocaleString('en-US')}\` for the service!`)
                                ]
                            })
                            con.query(`UPDATE userinventory SET baconp = baconp - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + 7500 * ${quantity} * ${results[0].businessBooster} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessProduced = businessProduced + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + ${tipfix} WHERE userId = '${interaction.user.id}';`)
                            return;
                        }
                        if (randomizedtipornot > 7) {
                            let moneyearned = quantity * 7500 * results[0].businessBooster;

                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You successfully sold \`${quantity.toLocaleString('en-US')}\` Bacon Pizza(s) and earned \`$${moneyearned.toLocaleString('en-US')}\`!`)
                                ]
                            })
                            con.query(`UPDATE userinventory SET baconp = baconp - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + 7500 * ${quantity} * ${results[0].businessBooster} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessProduced = businessProduced + ${quantity} WHERE userId = '${interaction.user.id}';`)
                            return;
                        }
                    }

                    //NEW

                    if (pizzatype === 'chicken') {
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
                        if (results[0].chickenp < quantity) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} You may not sell more pizzas than you have.`)
                                ],
                                ephemeral: true
                            })
                        }
                        let randomizedtipornot = Math.floor(Math.random() * (10 - 1) + 1);

                        if (randomizedtipornot <= 7) {
                            let percentage = Math.floor(Math.random() * (10 - 1) + 1);
                            let moneyearned = quantity * 12500 * results[0].businessBooster;
                            let tip = percentage / 100 * moneyearned;
                            let tipfix = Math.floor(tip);

                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You successfully sold \`${quantity.toLocaleString('en-US')}\` Chicken Pizza(s) and earned \`$${moneyearned.toLocaleString('en-US')}\`!\n\nOntop of that a customer left a tip containing a \`${percentage}%\` tip total to \`$${tipfix.toLocaleString('en-US')}\` for the service!`)
                                ]
                            })
                            con.query(`UPDATE userinventory SET chickenp = chickenp - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + 12500 * ${quantity} * ${results[0].businessBooster} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessProduced = businessProduced + ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + ${tipfix} WHERE userId = '${interaction.user.id}';`)
                            return;
                        }
                        if (randomizedtipornot > 7) {
                            let moneyearned = quantity * 12500 * results[0].businessBooster;

                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You successfully sold \`${quantity.toLocaleString('en-US')}\` Chicken Pizza(s) and earned \`$${moneyearned.toLocaleString('en-US')}\`!`)
                                ]
                            })
                            con.query(`UPDATE userinventory SET chickenp = chickenp - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + 12500 * ${quantity} * ${results[0].businessBooster} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessProduced = businessProduced + ${quantity} WHERE userId = '${interaction.user.id}';`)
                            return;
                        }
                    }

                    //NEW

                    if (pizzatype === 'bitcoin') {
                        if (results[0].hasCryptoWallet !== 1) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} Please purchase a crypto wallet!`)
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
                        if (results[0].cryptoBitcoin < quantity) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} You may not sell more bitcoins than you have.`)
                                ]
                            })
                        }
                        let currentcost = results[0].btcshareCost;
                        let moneyearned = Math.floor(currentcost * quantity);


                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${emoji.success} You successfully sold **${quantity.toLocaleString('en-US')}** BTC and earned back **$${moneyearned.toLocaleString('en-US')}**!`)
                            ]
                        })
                        con.query(`UPDATE cryptowallet SET cryptoBitcoin = cryptoBitcoin - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + ${currentcost} * ${quantity} WHERE userId = '${interaction.user.id}';`)
                        return;
                    }

                    if (pizzatype === 'ethereum') {
                        if (results[0].hasCryptoWallet !== 1) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} Please purchase a crypto wallet!`)
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
                        if (results[0].cryptoEthereum < quantity) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} You may not sell more Ethereum than you have.`)
                                ],
                                ephemeral: true
                            })
                        }
                        let currentcost = results[0].ethshareCost;
                        let moneyearned = Math.floor(currentcost * quantity);


                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${emoji.success} You successfully sold **${quantity.toLocaleString('en-US')}** ETH and earned back **$${moneyearned.toLocaleString('en-US')}**!`)
                            ]
                        })
                        con.query(`UPDATE cryptowallet SET cryptoEthereum = cryptoEthereum - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + ${currentcost} * ${quantity} WHERE userId = '${interaction.user.id}';`)
                        return;
                    }

                    //NEW

                    if (pizzatype === 'litecoin') {
                        if (results[0].hasCryptoWallet !== 1) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} Please purchase a crypto wallet!`)
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
                        if (results[0].cryptoLitecoin < quantity) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} You may not sell more Litecoin than you have.`)
                                ],
                                ephemeral: true
                            })
                        }
                        let currentcost = results[0].ltcshareCost;
                        let moneyearned = Math.floor(currentcost * quantity);


                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${emoji.success} You successfully sold **${quantity.toLocaleString('en-US')}** LTC and earned back **$${moneyearned.toLocaleString('en-US')}**!`)
                            ]
                        })
                        con.query(`UPDATE cryptowallet SET cryptoLitecoin = cryptoLitecoin - ${quantity} WHERE userId = '${interaction.user.id}';
                            UPDATE business SET businessBalance = businessBalance + ${currentcost} * ${quantity} WHERE userId = '${interaction.user.id}';`)
                        return;
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