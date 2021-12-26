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
    name: 'recipe',
    aliases: ['recipes', 'r'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        con.query(`SELECT * FROM ownedrecipes WHERE userId = '${message.author.id}';`, function (error, results, fields) {
            if (results && results.length) {
                let embed = new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`📃 Owned Pizza Recipes 📃`)
                if (args[0] !== '1' && args[0] !== undefined && args[0] !== '2') {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`${emoji.error} That is not a valid page.`)
                        ]
                    })
                }
                if (!args[0] || args[0] === '1') {
                    embed.setDescription(`Running low on recipes? Purchase more from the \`${prefix}shop\`!\nSwitch pages with \`${prefix}recipe [page]\``)
                        .setFooter(message.author.tag + " | Page 1/2")
                    if (results[0].recipeDough !== 0) {
                        embed.addField(`${emoji.pizza} Dough Recipe ${emoji.pizza}`, `\`\`\`1x Yeast\n1x Salt\n1x Sugar\n1x Flour\`\`\``)
                    }
                    if (results[0].recipeMargherita !== 0) {
                        embed.addField(`${emoji.pizza} Margherita Recipe ${emoji.pizza}`, `\`\`\`1x Dough\n1x Cheese\n1x Sauce\`\`\``)
                    }
                    if (results[0].recipeHawaiian !== 0) {
                        embed.addField(`${emoji.pizza} Hawaiian Recipe ${emoji.pizza}`, `\`\`\`1x Dough\n1x Cheese\n1x Sauce\n1x Pineapple\n1x Ham\`\`\``)
                    }
                    if (results[0].recipePepperoni !== 0) {
                        embed.addField(`${emoji.pizza} Pepperoni Recipe ${emoji.pizza}`, `\`\`\`1x Dough\n1x Cheese\n1x Sauce\n1x Pepperoni\`\`\``)
                    }
                    if (results[0].recipeHabanero !== 0) {
                        embed.addField(`${emoji.pizza} Habanero Recipe ${emoji.pizza}`, `\`\`\`1x Dough\n1x Sauce\n1x Cheese\n1x Pepper\`\`\``)
                    }
                }
                if (args[0] === '2') {
                    embed.setDescription(`Running low on recipes? Purchase more from the \`${prefix}shop\`!\nSwitch pages with \`${prefix}recipe [page]\``)
                        .setFooter(message.author.tag + " | Page 2/2")
                    if (results[0].recipeBacon !== 0) {
                        embed.addField(`${emoji.pizza} Bacon Recipe ${emoji.pizza}`, `\`\`\`1x Dough\n1x Sauce\n1x Cheese\n1x Bacon\`\`\``)
                    }
                    if (results[0].recipeChicken !== 0) {
                        embed.addField(`${emoji.pizza} Chicken Recipe ${emoji.pizza}`, `\`\`\`1x Dough\n1x Sauce\n1x Cheese\n1x Chicken\n1x Garlic\`\`\``)
                    }

                    if (results[0].recipeBacon !== 1 && results[0].recipeChicken !== 1) {
                        embed.setDescription(`${emoji.uparrow} You have no owned recipes on this page yet. ${emoji.uparrow}`)
                    }
                }
                return message.reply({
                    embeds: [embed]
                })
            } else {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`Looks like you have not yet registered a business, please register one before using commands.\nRegister a business with the command \`${prefix}register\`!`)
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