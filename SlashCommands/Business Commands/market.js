    const {
        Client,
        CommandInteraction,
        MessageEmbed,
        MessageActionRow,
        MessageButton
    } = require('discord.js');
    const ee = require('../../botconfig/embed.json');
    const emoji = require('../../botconfig/emojis.json')
    const prettyMilliseconds = require('pretty-ms');
    const config = require('../../botconfig/config.json')
    const {
        evaluate
    } = require("mathjs");

    module.exports = {
        name: 'market',
        description: 'Open the crypto market and inspect it!',
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args, con) => {
            con.query(`SELECT * FROM business LEFT JOIN cryptowallet ON business.userId = cryptowallet.userId LEFT JOIN cryptobitcoin ON business.access = cryptobitcoin.access LEFT JOIN cryptoethereum ON business.access = cryptoethereum.access LEFT JOIN cryptolitecoin ON business.access = cryptolitecoin.access WHERE business.userId = '${interaction.user.id}';`, function (error, results, fields) {
                //return console.log(results)
                let embed = new MessageEmbed()
                embed.setColor(ee.color)
                embed.setTitle(`🪙 Crypto Market 🪙`)
                embed.setFooter(`💵 Balance: $${results[0].businessBalance.toLocaleString('en-US')}\nBuy: /buy [ID]`)
                var now = new Date();
                var mins = now.getMinutes();
                embed.setDescription(`Prices change in: \`${60 - mins} min\`\n----------------------------`)
                const newgodown1 = evaluate(`${results[0].btcoldCost} - ${results[0].btcshareCost}`)
                const newgoup1 = evaluate(`${results[0].btcshareCost} - ${results[0].btcoldCost}`)

                const newgodown2 = evaluate(`${results[0].etholdCost} - ${results[0].ethshareCost}`)
                const newgoup2 = evaluate(`${results[0].ethshareCost} - ${results[0].etholdCost}`)

                const newgodown3 = evaluate(`${results[0].ltcoldCost} - ${results[0].ltcshareCost}`)
                const newgoup3 = evaluate(`${results[0].ltcshareCost} - ${results[0].ltcoldCost}`)

                if (results[0].btcshareCost > results[0].btcoldCost) {
                    embed.addField(`${emoji.bitcoin} Bitcoin | Owned: ${results[0].cryptoBitcoin.toLocaleString('en-US')}`, `
                            $${results[0].btcshareCost} | ${emoji.uparrow} +$${newgoup1.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            Volume Sold: ${results[0].btctotalShares.toLocaleString('en-US')}
                            ID: \`bitcoin\`
                            `)
                } else {
                    embed.addField(`${emoji.bitcoin} Bitcoin | Owned: ${results[0].cryptoBitcoin.toLocaleString('en-US')}`, `
                            $${results[0].btcshareCost} | 🔻 -$${newgodown1.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            Volume Sold: ${results[0].btctotalShares}
                            ID: \`bitcoin\`
                            `)
                }

                if (results[0].ethshareCost > results[0].etholdCost) {
                    embed.addField(`${emoji.ethereum} Ethereum | Owned: ${results[0].cryptoEthereum.toLocaleString('en-US')}`, `
                            $${results[0].ethshareCost} | ${emoji.uparrow} +$${newgoup2.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            Volume Sold: ${results[0].ethtotalShares}
                            ID: \`ethereum\`
                            `)
                } else {
                    embed.addField(`${emoji.ethereum} Ethereum | Owned: ${results[0].cryptoEthereum.toLocaleString('en-US')}`, `
                            $${results[0].ethshareCost} | 🔻 -$${newgodown2.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            Volume Sold: ${results[0].ethtotalShares}
                            ID: \`ethereum\`
                            `)
                }

                if (results[0].ltcshareCost > results[0].ltcoldCost) {
                    embed.addField(`${emoji.litecoin} Litecoin | Owned: ${results[0].cryptoLitecoin.toLocaleString('en-US')}`, `
                            $${results[0].ltcshareCost} | ${emoji.uparrow} +$${newgoup3.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            Volume Sold: ${results[0].ltctotalShares}
                            ID: \`litecoin\`
                            `)
                } else {
                    embed.addField(`${emoji.litecoin} Litecoin | Owned: ${results[0].cryptoLitecoin.toLocaleString('en-US')}`, `
                            $${results[0].ltcshareCost} | 🔻 -$${newgodown3.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            Volume Sold: ${results[0].ltctotalShares}
                            ID: \`litecoin\`
                            `)
                }
                //LISTING MARKET FUNCTION HERE!
                return interaction.reply({
                    embeds: [embed]
                })
            });
        }
    }

    /*

    Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
    Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
    Other than that, please do note that it is required if you are using this to mention the original developer
    Original Developer - PGamingHD#0666
    
    */