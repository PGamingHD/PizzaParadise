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
    evaluate,
    bellNumbersDependencies
} = require('mathjs');
const e = require('express');

module.exports = {
    name: 'profile',
    aliases: ['userprofile', 'p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        con.query(`SELECT * FROM business LEFT JOIN userprofile ON business.userId = userprofile.userId LEFT JOIN cryptowallet ON business.userId = cryptowallet.userId WHERE business.userId = '${message.author.id}'`, function (error, results, fields) {
            if (error) throw error;
            if (results && results.length) {
                let embed = new MessageEmbed()
                    .setColor(ee.color)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTitle(`📉 User Profile 📉`)
                    .addField(`Profile For`, `${message.author}`)
                    .addField(`Balance`, `${emoji.currency} $${results[0].userBalance.toLocaleString('en-US')}`)
                    //.addField(`Income (per hour)`, `${emoji.bank} $${rows[0].businessIncome.toLocaleString('en-US')}`)
                    .addField(`Owned Business`, `${emoji.uparrow} ${results[0].businessName}`)

                if (results[0].hasCryptoWallet === 1) {
                    embed.addField(`Crypto Wallet`, `${emoji.bitcoin} \`Owned\``)
                    embed.setFooter(`Open your owned crypto wallet with ${prefix}wallet!`)
                } else {
                    embed.addField(`Crypto Wallet`, `\`Not Owned\``)
                    embed.setFooter(`Purchase a crypto wallet from the misc shop!`)
                }
                return message.reply({
                    embeds: [embed]
                });
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