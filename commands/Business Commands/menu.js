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
    name: 'menu',
    aliases: ['pmenu', 'm'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        con.query(`SELECT * FROM business LEFT JOIN ownedrecipes ON business.userId = ownedrecipes.userId WHERE business.userId = '${message.author.id}'`, function (error, results, fields) {
            if (error) throw error;
            if (results && results.length) {

                let embed = new MessageEmbed()
                    .setColor(ee.color)
                    .setTitle(`🧾 Business Menu 🧾`)
                    .setFooter(`${results[0].businessName} | ${message.author.tag}`)
                    .setFooter(`Bake pizzas with ${prefix}bake [type] [amount] and sell with ${prefix}sell [type] [amount]!`)
                if (results[0].recipeMargherita === 1) {
                    embed.addField(`${emoji.pizza} Margherita Pizza ${emoji.pizza}`, `ID: \`margherita\`\nPrice/pizza: \`$750\``)
                }
                if (results[0].recipeHawaiian === 1) {
                    embed.addField(`${emoji.pizza} Hawaiian Pizza ${emoji.pizza}`, `ID: \`hawaiian\`\nPrice/pizza: \`$2,500\``)
                }
                if (results[0].recipePepperoni === 1) {
                    embed.addField(`${emoji.pizza} Pepperoni Pizza ${emoji.pizza}`, `ID: \`pepperoni\`\nPrice/pizza: \`$3,500\``)
                }
                if (results[0].recipeHabanero === 1) {
                    embed.addField(`${emoji.pizza} Habanero Pizza ${emoji.pizza}`, `ID: \`habanero\`\nPrice/pizza: \`$5,000\``)
                }
                if (results[0].recipeBacon === 1) {
                    embed.addField(`${emoji.pizza} Bacon Pizza ${emoji.pizza}`, `ID: \`bacon\`\nPrice/pizza: \`$7,500\``)
                }
                if (results[0].recipeChicken === 1) {
                    embed.addField(`${emoji.pizza} Chicken Pizza ${emoji.pizza}`, `ID: \`chicken\`\nPrice/pizza: \`$12,500\``)
                }

                return message.reply({
                    embeds: [embed]
                })
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