const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
const emoji = require('../../botconfig/emojis.json')
const ee = require('../../botconfig/embed.json');
const config = require('../../botconfig/config.json');
const prettyMilliseconds = require('pretty-ms')
const {
    evaluate
} = require('mathjs');

module.exports = {
    name: 'buy',
    aliases: ['buyitem', 'purchase'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        con.query(`SELECT * FROM business LEFT JOIN ownedrecipes ON business.userId = ownedrecipes.userId LEFT JOIN cryptowallet ON business.userId = cryptowallet.userId LEFT JOIN userinventory ON business.userId = userinventory.userId LEFT JOIN cryptobitcoin ON business.access = cryptobitcoin.access LEFT JOIN cryptoethereum ON business.access = cryptoethereum.access LEFT JOIN cryptolitecoin ON business.access = cryptolitecoin.access LEFT JOIN ingredientstock ON business.access = ingredientstock.access WHERE business.userId = '${message.author.id}';`, function (error, results, fields) {
            if (error) throw error;
            if (results && results.length) {
                if (!args[0]) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`${emoji.error} Please specify an ID!`),
                        ],
                    });
                }
                const purchaseableIDs = [
                    "bitcoin",
                    "ethereum",
                    "litecoin",
                    "hawaiianr",
                    "pepperonir",
                    "habaneror",
                    "baconr",
                    "chickenr",
                    "cheese",
                    "sauce",
                    "pepperoni",
                    "pineapple",
                    "yeast",
                    "salt",
                    "sugar",
                    "flour",
                    "bacon",
                    "garlic",
                    "chicken",
                    "pepper",
                    "ham",
                    "cryptowallet"
                ]

                const idinput = args[0].toLowerCase();
                if (!purchaseableIDs.includes(idinput)) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`${emoji.error} Please use a valid ID!`),
                        ],
                    });
                }

                if (idinput === 'bitcoin') {
                    if (results[0].hasCryptoWallet !== 1) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please purchase a crypto wallet!`)
                            ]
                        })
                    }
                    if (!args[0]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please enter a quantity.`)
                            ]
                        })
                    }
                    args.shift();
                    if (!args[0]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please enter a quantity.`)
                            ]
                        })
                    }
                    let quantity = args[0].toLowerCase();

                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please enter a valid **number** to purchase bitcoin in.`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** bitcoins at a time!`)
                            ]
                        })
                    }

                    if (results[0].businessBalance < results[0].btcshareCost * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }

                    let cost = quantity * results[0].btcshareCost;
                    let nowmoney = results[0].businessBalance - cost;

                    con.query(`UPDATE business SET businessBalance = ${nowmoney} WHERE userId = '${message.author.id}';
                    UPDATE cryptowallet SET cryptoBitcoin = cryptoBitcoin + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE cryptobitcoin SET btctotalShares = btctotalShares + ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} You successfully bought **${quantity.toLocaleString('en-US')}** BTC for **$${cost.toLocaleString('en-US')}**!`)
                        ]
                    })
                }
                if (idinput === 'ethereum') {
                    if (results[0].hasCryptoWallet !== 1) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please purchase a crypto wallet!`)
                            ]
                        })
                    }
                    if (!args[0]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please enter a quantity.`)
                            ]
                        })
                    }
                    args.shift();
                    if (!args[0]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please enter a quantity.`)
                            ]
                        })
                    }
                    let quantity = args[0].toLowerCase();

                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please enter a valid **number** to purchase ethereum in.`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ethereum at a time!`)
                            ]
                        })
                    }

                    if (results[0].businessBalance < results[0].ethshareCost * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }

                    let cost = quantity * results[0].ethshareCost;
                    let nowmoney = results[0].businessBalance - cost;

                    con.query(`UPDATE business SET businessBalance = ${nowmoney} WHERE userId = '${message.author.id}';
                    UPDATE cryptowallet SET cryptoEthereum = cryptoEthereum + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE cryptoethereum SET ethtotalShares = ethtotalShares + ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} You successfully bought **${quantity.toLocaleString('en-US')}** ETH for **$${cost.toLocaleString('en-US')}**!`)
                        ]
                    })
                }
                if (idinput === 'litecoin') {
                    if (results[0].hasCryptoWallet !== 1) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please purchase a crypto wallet!`)
                            ]
                        })
                    }
                    if (!args[0]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please enter a quantity.`)
                            ]
                        })
                    }
                    args.shift();
                    if (!args[0]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please enter a quantity.`)
                            ]
                        })
                    }
                    let quantity = args[0].toLowerCase();

                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please enter a valid **number** to purchase litecoin in.`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** litecoin at a time!`)
                            ]
                        })
                    }

                    if (results[0].businessBalance < results[0].ltcshareCost * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }

                    let cost = quantity * results[0].ltcshareCost;
                    let nowmoney = results[0].businessBalance - cost;

                    con.query(`UPDATE business SET businessBalance = ${nowmoney} WHERE userId = '${message.author.id}';
                    UPDATE cryptowallet SET cryptoLitecoin = cryptoLitecoin + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE cryptolitecoin SET ltctotalShares = ltctotalShares + ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} You successfully bought **${quantity.toLocaleString('en-US')}** LTC for **$${cost.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                if (idinput === 'hawaiianr') {
                    if (results[0].recipeHawaiian === 1) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may not buy a recipe twice.`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 100000) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }

                    con.query(`UPDATE business SET businessBalance = businessBalance - 100000 WHERE userId = '${message.author.id}';
                    UPDATE ownedrecipes SET recipeHawaiian = 1 WHERE userId = '${message.author.id}';`)

                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} You successfully bought the **Hawaiian Pizza Recipe**, it can now be baked with the correct ingredients!`)
                        ]
                    })
                }

                if (idinput === 'pepperonir') {
                    if (results[0].recipePepperoni === 1) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may not buy a recipe twice.`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 250000) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }

                    con.query(`UPDATE business SET businessBalance = businessBalance - 250000 WHERE userId = '${message.author.id}';
                    UPDATE ownedrecipes SET recipePepperoni = 1 WHERE userId = '${message.author.id}';`)

                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} You successfully bought the **Pepperoni Pizza Recipe**, it can now be baked with the correct ingredients!`)
                        ]
                    })
                }

                if (idinput === 'habaneror') {
                    if (results[0].recipeHabanero === 1) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may not buy a recipe twice.`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 750000) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }

                    con.query(`UPDATE business SET businessBalance = businessBalance - 750000 WHERE userId = '${message.author.id}';
                    UPDATE ownedrecipes SET recipeHabanero = 1 WHERE userId = '${message.author.id}';`)

                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} You successfully bought the **Habanero Pizza Recipe**, it can now be baked with the correct ingredients!`)
                        ]
                    })
                }

                if (idinput === 'baconr') {
                    if (results[0].recipeBacon === 1) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may not buy a recipe twice.`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 1000000) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }

                    con.query(`UPDATE business SET businessBalance = businessBalance - 1000000 WHERE userId = '${message.author.id}';
                    UPDATE ownedrecipes SET recipeBacon = 1 WHERE userId = '${message.author.id}';`)

                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} You successfully bought the **Bacon Pizza Recipe**, it can now be baked with the correct ingredients!`)
                        ]
                    })
                }

                if (idinput === 'chickenr') {
                    if (results[0].recipeChicken === 1) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may not buy a recipe twice.`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 2500000) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }

                    con.query(`UPDATE business SET businessBalance = businessBalance - 2500000 WHERE userId = '${message.author.id}';
                    UPDATE ownedrecipes SET recipeChicken = 1 WHERE userId = '${message.author.id}';`)

                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} You successfully bought the **Chicken Pizza Recipe**, it can now be baked with the correct ingredients!`)
                        ]
                    })
                }

                if (idinput === 'cheese') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].cheesestock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 100 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }
                    let totalmoney = 100 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET cheese = cheese + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET cheesestock = cheesestock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** pieces of cheese for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'sauce') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].saucestock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 100 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }
                    let totalmoney = 100 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET sauce = sauce + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET saucestock = saucestock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** cans of sauce for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'pineapple') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].pineapplestock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 1000 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }
                    let totalmoney = 1000 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET pineapple = pineapple + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET pineapplestock = pineapplestock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** cans of pineapple for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'pepperoni') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].pepperonistock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 2000 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }
                    let totalmoney = 2000 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET pepperoni = pepperoni + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET pepperonistock = pepperonistock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** pieces of pepperoni for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'yeast') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].yeaststock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 50 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }
                    let totalmoney = 50 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET yeast = yeast + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET yeaststock = yeaststock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** packets of yeast for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'salt') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].saltstock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 50 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }
                    let totalmoney = 50 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET salt = salt + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET saltstock = saltstock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** cans of salt for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'sugar') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].sugarstock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 75 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }
                    let totalmoney = 75 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET sugar = sugar + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET sugarstock = sugarstock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** cans of sugar for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'flour') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].flourstock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 75 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }
                    let totalmoney = 75 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET flour = flour + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET flourstock = flourstock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** cans of flour for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'bacon') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].baconstock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 5000 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }
                    let totalmoney = 5000 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET bacon = bacon + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET baconstock = baconstock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** packages of bacon for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'garlic') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].garlicstock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 500 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }
                    let totalmoney = 500 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET garlic = garlic + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET garlicstock = garlicstock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** cans of garlic for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'chicken') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].chickenstock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 7500 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }


                    let totalmoney = 7500 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET chicken = chicken + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET chickenstock = chickenstock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** packages of chicken for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'pepper') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].pepperstock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 3000 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }
                    let totalmoney = 3000 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET pepper = pepper + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET pepperstock = pepperstock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** packages of pepper for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'ham') {
                    if (!args[1]) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Please input a valid **quantity** to purchase!`)
                            ]
                        })
                    }
                    let quantity = args[1].toLowerCase();
                    if (isNaN(quantity) && quantity !== 'max') {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} Quantity must be a **number**!`)
                            ]
                        })
                    }
                    if (quantity === 'max') {
                        quantity = 100;
                    }
                    if (quantity > 100) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You may only buy **100** ingredients at a time!`)
                            ]
                        })
                    }
                    if (results[0].hamstock < quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`There is not enough **stock** left to continue with this **purchase**!`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 500 * quantity) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }


                    let totalmoney = 500 * quantity;
                    con.query(`UPDATE business SET businessBalance = businessBalance - ${totalmoney} WHERE userId = '${message.author.id}';
                    UPDATE userinventory SET ham = ham + ${quantity} WHERE userId = '${message.author.id}';
                    UPDATE ingredientstock SET hamstock = hamstock - ${quantity};`)
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} Successfully bought **${quantity.toLocaleString('en-US')}** packages of ham for **$${totalmoney.toLocaleString('en-US')}**!`)
                        ]
                    })
                }

                //NEW

                if (idinput === 'cryptowallet') {
                    if (results[0].hasCryptoWallet !== 0) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`You may not purchase a **crypto wallet** twice.`)
                            ]
                        })
                    }
                    if (results[0].businessBalance < 1000000) {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You don't have enough money!`)
                            ]
                        })
                    }

                    con.query(`UPDATE business SET businessBalance = businessBalance - 1000000 WHERE userId = '${message.author.id}';
                    UPDATE cryptowallet SET hasCryptoWallet = 1 WHERE userId = '${message.author.id}';`)

                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} You successfully purchased a **crypto wallet** for **$1,000,000**!`)
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