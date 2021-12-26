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
    name: 'wallet',
    aliases: ['cwallet', 'w', 'crypto'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        con.query(`SELECT * FROM cryptowallet WHERE userId = '${message.author.id}'`, function (error, results, fields) {
            if (error) throw error;
            if (results && results.length) {
                if (results[0].hasCryptoWallet === 1) {
                    let embed = new MessageEmbed()
                        .setColor(ee.color)
                        .setThumbnail(message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`🪙 Crypto Wallet 🪙`)
                        .addField(`Wallet Owner`, `${message.author}`)
                        .addField(`Bitcoins`, `${emoji.bitcoin} \`${results[0].cryptoBitcoin}\``, true)
                        .addField(`Ethereum`, `${emoji.ethereum} \`${results[0].cryptoEthereum}\``, true)
                        .addField(`Litecoin`, `${emoji.litecoin} \`${results[0].cryptoLitecoin}\``, true)
                        .setFooter(`Crypto Currencies can be purchased from the crypto market!`)
                    return message.reply({
                        embeds: [embed]
                    });
                } else {
                    return message.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`${emoji.error} Please purchase a crypto wallet!\nPurchase one with \`${prefix}buy cryptowallet\`!\nWhat does a crypto wallet cost? And how do you get it? Buy it from \`${prefix}shop misc\` and it costs **$1,000,000**!`)
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