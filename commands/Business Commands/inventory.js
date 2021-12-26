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
    name: 'inventory',
    aliases: ['inv', 'invent', 'i'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        con.query(`SELECT * FROM business LEFT JOIN userinventory ON business.userId = userinventory.userId WHERE business.userId = '${message.author.id}'`, function (error, results, fields) {
            if (error) throw error;
            if (results && results.length) {
                if (!args[0]) {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setTitle(`❓ Inventories ❓`)
                            .setDescription(`Choose a type of inventory to open with \`${prefix}inventory [type]\``)
                            .addField(`Ingredients Inventory`, `\`${prefix}inventory ingredient\``, true)
                            .addField(`Pizza Inventory`, `\`${prefix}inventory pizza\``, true)
                        ]
                    })
                }
                if (args[0].toLowerCase() !== 'ingredient' && args[0].toLowerCase() !== 'ingredients' && args[0].toLowerCase() !== 'i' && args[0].toLowerCase() !== 'pizza' && args[0].toLowerCase() !== 'pizzas' && args[0].toLowerCase() !== 'p') {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`${emoji.error} Please enter a valid inventory **type** to open.`)
                        ]
                    })
                }
                if (args[0].toLowerCase() === 'ingredient' || args[0].toLowerCase() === 'ingredients' || args[0].toLowerCase() === 'i') {
                    let embed = new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`📦 Ingredients Inventory 📦`, `━━━━━━━━━━━`)
                        .addField(`📦 Yeast`, `\`${results[0].yeast.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Salt`, `\`${results[0].salt.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Sugar`, `\`${results[0].sugar.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Flour`, `\`${results[0].flour.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Dough`, `\`${results[0].dough.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Cheese`, `\`${results[0].cheese.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Sauce`, `\`${results[0].sauce.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Pineapple`, `\`${results[0].pineapple.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Ham`, `\`${results[0].ham.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Pepperoni`, `\`${results[0].pepperoni.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Bacon`, `\`${results[0].bacon.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Garlic`, `\`${results[0].garlic.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Chicken`, `\`${results[0].chicken.toLocaleString('en-US')}x\``, true)
                        .addField(`📦 Pepper`, `\`${results[0].pepper.toLocaleString('en-US')}x\``, true)
                        .setFooter(`${results[0].businessName} | ${message.author.tag}`)

                    return message.reply({
                        embeds: [embed]
                    })
                }
                if (args[0].toLowerCase() === 'pizza' || args[0].toLowerCase() === 'pizzas' || args[0].toLowerCase() === 'p') {
                    let embed = new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`${emoji.pizza} Pizza Inventory ${emoji.pizza}`, `━━━━━━━━━━━`)
                        .addField(`${emoji.pizza} Margherita`, `\`${results[0].margheritap.toLocaleString('en-US')}x\``, true)
                        .addField(`${emoji.pizza} Hawaiian`, `\`${results[0].hawaiianp.toLocaleString('en-US')}x\``, true)
                        .addField(`${emoji.pizza} Pepperoni`, `\`${results[0].pepperonip.toLocaleString('en-US')}x\``, true)
                        .addField(`${emoji.pizza} Habanero`, `\`${results[0].habanerop.toLocaleString('en-US')}x\``, true)
                        .addField(`${emoji.pizza} Bacon`, `\`${results[0].baconp.toLocaleString('en-US')}x\``, true)
                        .addField(`${emoji.pizza} Chicken`, `\`${results[0].chickenp.toLocaleString('en-US')}x\``, true)
                        .setFooter(`${results[0].businessName} | ${message.author.tag}`)

                    return message.reply({
                        embeds: [embed]
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