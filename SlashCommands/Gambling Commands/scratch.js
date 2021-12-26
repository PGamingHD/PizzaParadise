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

    module.exports = {
        name: 'scratch',
        description: 'Scratch a ticket and see if the luck is on your side!',
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args, con) => {
            con.query(`SELECT * FROM business WHERE userId = '${interaction.user.id}'`, async function (error, results, fields) {
                if (error) throw error;
                if (results && results.length) {
                    if (results[0].businessBalance < 100) {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`You don't have enough money!`)
                            ]
                        })
                    }

                    con.query(`UPDATE business SET businessBalance = businessBalance - 100 WHERE userId = '${interaction.user.id}';`)
                    const ticketscratch = Math.floor(Math.random() * (1000 - 1) + 1);

                    if (ticketscratch <= 1) {
                        const ticketscratched = Math.floor(Math.random() * (100000 - 50000) + 50000);
                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${emoji.currency} Scratching your card for **$100**...`)
                                .setFooter(interaction.user.tag)
                            ]
                        })
                        setTimeout(() => {
                            interaction.editReply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.currency} **Big win!**  You have won **$${ticketscratched.toLocaleString('en-US')}** on your scratch ticket!`)
                                    .setFooter(interaction.user.tag)
                                ]
                            })
                            con.query(`UPDATE business SET businessBalance = businessBalance + ${ticketscratched} WHERE userId = '${interaction.user.id}';`)
                        }, 1000 * 2.5);
                    } else {
                        const ticketscratched = Math.floor(Math.random() * (100 - 10) + 10);
                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${emoji.currency} Scratching your card for **$100**...`)
                                .setFooter(interaction.user.tag)
                            ]
                        })
                        setTimeout(() => {
                            interaction.editReply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.currency} You have won **$${ticketscratched.toLocaleString('en-US')}** on your scratch ticket!`)
                                    .setFooter(interaction.user.tag)
                                ]
                            })
                            con.query(`UPDATE business SET businessBalance = businessBalance + ${ticketscratched} WHERE userId = '${interaction.user.id}';`)
                        }, 1000 * 2.5);
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