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
        name: 'shop',
        description: 'Open the shop and purchase ingredients and other stuff!',
        options: [{
            name: 'page',
            description: 'What shop page would you like to display?',
            type: Constants.ApplicationCommandOptionTypes.STRING,
        }],
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args, con) => {
            con.query(`SELECT * FROM business LEFT JOIN ownedrecipes ON business.userId = ownedrecipes.userId LEFT JOIN ingredientstock ON business.access = ingredientstock.access WHERE business.userId = '${interaction.user.id}'`, function (error, results, fields) {
                if (error) throw error;
                if (results && results.length) {
                    if (!args[0]) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setTitle(`❓ Shops ❓`)
                                .addField(`Ingredients Shop`, `\`/shop ingredient\``, true)
                                .addField(`Recipe Shop`, `\`/shop recipe\``, true)
                                .addField(`Miscellaneous Shop`, `\`/shop misc\``, true)
                                .setDescription(`Choose a shop type with \`/shop [type]\``)
                            ]
                        })
                    }
                    let shoptype = args[0].toLowerCase();

                    if (shoptype !== 'recipe' && shoptype !== 'ingredient' && shoptype !== 'misc') {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} That is not a valid page.`)
                            ]
                        })
                    }
                    if (shoptype === 'recipe') {
                        let embed = new MessageEmbed()
                            .setColor(ee.color)
                            .setTitle(`📃 Recipe Market 📃`)
                            .setDescription(`Swap market pages with \`/shop [page]\`!`)
                            .setFooter(`Buy something with /buy [ID]`)
                        if (results[0].recipeHawaiian !== 1) {
                            embed.addField(`${emoji.pizza} Hawaiian Pizza ${emoji.pizza}`, `Cost: $100,000\nPrice/pizza: $2,500\nID: \`hawaiianr\``)
                        }
                        if (results[0].recipePepperoni !== 1) {
                            embed.addField(`${emoji.pizza} Pepperoni Pizza ${emoji.pizza}`, `Cost: $250,000\nPrice/pizza: $3,500\nID: \`pepperonir\``)
                        }
                        if (results[0].recipeHabanero !== 1) {
                            embed.addField(`${emoji.pizza} Habanero Pizza ${emoji.pizza}`, `Cost: $750,000\nPrice/pizza: $5,000\nID: \`habaneror\``)
                        }
                        if (results[0].recipeBacon !== 1) {
                            embed.addField(`${emoji.pizza} Bacon Pizza ${emoji.pizza}`, `Cost: $1,000,000\nPrice/pizza: $7,500\nID: \`baconr\``)
                        }
                        if (results[0].recipeChicken !== 1) {
                            embed.addField(`${emoji.pizza} Chicken Pizza ${emoji.pizza}`, `Cost: $2,500,000\nPrice/pizza: $12,500\nID: \`chickenr\``)
                        }
                        if (results[0].recipeHawaiian === 1 && results[0].recipePepperoni === 1 && results[0].recipeHabanero === 1 && results[0].recipeBacon === 1 && results[0].recipeChicken === 1) {
                            embed.setDescription(`${emoji.uparrow} You have already purchased all available recipes ${emoji.uparrow}\n\n━━━━━━━━━━━\n${emoji.currency} Balance: $${results[0].businessBalance.toLocaleString('en-US')}\nUse \`/buy [ID]\` to purchase a new recipe!`)
                        } else {
                            embed.addField(`━━━━━━━━━━━`, `${emoji.currency} Balance: ${results[0].businessBalance.toLocaleString('en-US')}\nUse \`/buy [ID]\` to purchase a new recipe!`)
                        }
                        return interaction.reply({
                            embeds: [embed]
                        })
                    }
                    if (shoptype === 'ingredient') {
                        var now = new Date();
                        var mins = now.getMinutes();
                        let embed = new MessageEmbed()
                            .setColor(ee.color)
                            .setTitle(`📦 Ingredients Market 📦`)
                            .setDescription(`Shop not refilled? Well it will refill in: \`${60 - mins} minutes\`!`)
                            .addField(`📦 Yeast`, `Price/Ingredient: $50\nStock: \`${results[0].yeaststock.toLocaleString('en-US')}\`\nID: \`yeast\``, true)
                            .addField(`📦 Salt`, `Price/Ingredient: $50\nStock: \`${results[0].saltstock.toLocaleString('en-US')}\`\nID: \`salt\``, true)
                            .addField(`📦 Sugar`, `Price/Ingredient: $75\nStock: \`${results[0].sugarstock.toLocaleString('en-US')}\`\nID: \`sugar\``, true)
                            .addField(`📦 Flour`, `Price/Ingredient: $75\nStock: \`${results[0].flourstock.toLocaleString('en-US')}\`\nID: \`flour\``, true)
                            .addField(`📦 Cheese`, `Price/Ingredient: $100\nStock: \`${results[0].cheesestock.toLocaleString('en-US')}\`\nID: \`cheese\``, true)
                            .addField(`📦 Sauce`, `Price/Ingredient: $100\nStock: \`${results[0].saucestock.toLocaleString('en-US')}\`\nID: \`sauce\``, true)
                            .addField(`📦 Pineapple`, `Price/Ingredient: $1,000\nStock: \`${results[0].pineapplestock.toLocaleString('en-US')}\`\nID: \`pineapple\``, true)
                            .addField(`📦 Ham`, `Price/Ingredient: $500\nStock: \`${results[0].hamstock.toLocaleString('en-US')}\`\nID: \`ham\``, true)
                            .addField(`📦 Pepperoni`, `Price/Ingredient: $2,000\nStock: \`${results[0].pepperonistock.toLocaleString('en-US')}\`\nID: \`pepperoni\``, true)
                            .addField(`📦 Bacon`, `Price/Ingredient: $5,000\nStock: \`${results[0].baconstock.toLocaleString('en-US')}\`\nID: \`bacon\``, true)
                            .addField(`📦 Garlic`, `Price/Ingredient: $500\nStock: \`${results[0].garlicstock.toLocaleString('en-US')}\`\nID: \`garlic\``, true)
                            .addField(`📦 Chicken`, `Price/Ingredient: $7,500\nStock: \`${results[0].chickenstock.toLocaleString('en-US')}\`\nID: \`chicken\``, true)
                            .addField(`📦 Pepper`, `Price/Ingredient: $3,000\nStock: \`${results[0].pepperstock.toLocaleString('en-US')}\`\nID: \`pepper\``, true)
                            .setFooter(`Buy something with /buy [ID]`)
                        return interaction.reply({
                            embeds: [embed]
                        })
                    }

                    if (shoptype === 'misc') {
                        let embed = new MessageEmbed()
                            .setColor(ee.color)
                            .setTitle(`💎 Miscellaneous Market 💎`)
                            .addField(`💎 Crypto Wallet`, `Price: $1,000,000\nID: \`cryptowallet\``, true)
                            .setFooter(`Buy something with /buy [ID]`)
                        return interaction.reply({
                            embeds: [embed]
                        })
                    }
                } else {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`Looks like you have not yet registered a business, please register one before using commands.\nRegister a business with the command \`/register\`!`)
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