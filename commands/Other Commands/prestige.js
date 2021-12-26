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
    name: 'prestige',
    aliases: ['prestigenow'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        con.query(`SELECT * FROM business WHERE userId = '${message.author.id}'`, function (error, results, fields) {
            if (error) throw error;
            if (results && results.length) {
                let moneyprice = 50000000 * results[0].businessBooster;
                if (results[0].businessLevel === 10 && results[0].businessBalance >= moneyprice) {
                    message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setTitle(`${emoji.warning} You are about to prestige, are you sure? ${emoji.warning}`)
                            .setDescription(`You are about to prestige, please read below what this will mean!\n\nBy prestigeing, you will gain a money multiplier. This money multiplier is permanent, however you will lose ALL of your progress. Inventory, money, everything so be careful with this and make sure to think twice about this. Still want to continue?\n\nPlease respond with \`proceed\` if this is what you want! Else reply with \`cancel\` to cancel this!`)
                            .setFooter(`Are you really sure about doing this? Please read through everything carefully!`)
                        ]
                    })

                    let collector = undefined;

                    collector = message.channel.createMessageCollector({
                        time: 150000
                    })

                    collector.on('collect', async (msg) => {

                        if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `proceed`) {
                            con.query(`UPDATE business SET businessBooster = businessBooster + 1 WHERE userId = '${message.author.id}';
                            UPDATE business SET businessBalance = 0 WHERE userId = '${message.author.id}';
                            UPDATE business SET businessLevel = 0 WHERE userId = '${message.author.id}';
                            UPDATE business SET businessXP = 0 WHERE userId = '${message.author.id}';
                            UPDATE business SET businessProduced = 0 WHERE userId = '${message.author.id}';
                            UPDATE ownedrecipes SET recipeHawaiian = 0 WHERE userId = '${message.author.id}';
                            UPDATE ownedrecipes SET recipePepperoni = 0 WHERE userId = '${message.author.id}';
                            UPDATE ownedrecipes SET recipeHabanero = 0 WHERE userId = '${message.author.id}';
                            UPDATE ownedrecipes SET recipeBacon = 0 WHERE userId = '${message.author.id}';
                            UPDATE ownedrecipes SET recipeChicken = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET cheese = 5 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET dough = 5 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET sauce = 5 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET yeast = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET salt = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET sugar = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET flour = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET margheritap = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET hawaiianp = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET pepperoni = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET ham = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET pineapple = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET bacon = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET garlic = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET chicken = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET pepper = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET baconp = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET chickenp = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET habanerop = 0 WHERE userId = '${message.author.id}';
                            UPDATE userinventory SET pepperonip = 0 WHERE userId = '${message.author.id}';
                            UPDATE cryptowallet SET hasCryptoWallet = 0 WHERE userId = '${message.author.id}';
                            UPDATE cryptowallet SET cryptoBitcoin = 0 WHERE userId = '${message.author.id}';
                            UPDATE cryptowallet SET cryptoEthereum = 0 WHERE userId = '${message.author.id}';
                            UPDATE cryptowallet SET cryptoLitecoin = 0 WHERE userId = '${message.author.id}';`)
                            return collector.stop();
                        }
                        if (message.guild.id === msg.guild.id && message.author.id === msg.author.id && msg.content.toLowerCase() === `cancel`) {
                            return collector.stop();
                        }
                    });

                    collector.on('end', collected => {
                        let allmsgs = collected.map(message => `${message}`).join(`, `);

                        if (allmsgs.toLowerCase().includes("proceed".toLowerCase())) {
                            let embed = new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`You have now prestieged, **congratulations**! Good luck on your newly restarted adventure.`)
                                .setTitle(`${emoji.success} Prestige Successful ${emoji.success}`)
                            return message.reply({
                                embeds: [embed]
                            })
                        } else if (allmsgs.toLowerCase().includes("cancel".toLowerCase())) {
                            return message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.error} Command was successfully cancelled!`)
                                ]
                            })
                        } else {
                            return message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} Command timed out!`)
                                ]
                            })
                        }
                    });
                } else {
                    let embed = new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`${emoji.error} You require to be level \`10\` and have \`$${moneyprice.toLocaleString('en-US')}\` business balance to prestige, please try again later!`)
                        .setFooter(`What does prestige do? Well, it resets you back to start. And gives you a better $$ multiplier. This is for hardcore players only!`)
                    return message.reply({
                        embeds: [embed]
                    })
                } //IF USERLVL 10 AND MONEY XX PRESTIGE!

            } else {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`You do not yet have a business registered. Register a business with the \`${prefix}register\` command!`)
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