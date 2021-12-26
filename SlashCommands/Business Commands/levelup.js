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
        name: 'levelup',
        description: 'Use this command to rank up if you have the right XP!',
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args, con) => {
            con.query(`SELECT * FROM business WHERE userId = '${interaction.user.id}'`, function (error, results, fields) {
                if (error) throw error;
                if (results && results.length) {

                    if (results[0].businessXP >= 2500 && results[0].businessXP <= 2525 && results[0].businessLevel === 0) {
                        con.query(`UPDATE business SET businessXP = 0 WHERE userId = '${interaction.user.id}';
                        UPDATE business SET businessLevel = 1 WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${interaction.user} You have successfully leveled up to **level 1**, congratulations!`)
                            ]
                        })
                    }

                    if (results[0].businessXP >= 5000 && results[0].businessXP <= 5025 && results[0].businessLevel === 1) {
                        con.query(`UPDATE business SET businessXP = 0 WHERE userId = '${interaction.user.id}';
                        UPDATE business SET businessLevel = 2 WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${interaction.user} You have successfully leveled up to **level 2**, congratulations!`)
                            ]
                        })
                    }

                    if (results[0].businessXP >= 15000 && results[0].businessXP <= 15025 && results[0].businessLevel === 2) {
                        con.query(`UPDATE business SET businessXP = 0 WHERE userId = '${interaction.user.id}';
                        UPDATE business SET businessLevel = 3 WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${interaction.user} You have successfully leveled up to **level 3**, congratulations!`)
                            ]
                        })
                    }

                    if (results[0].businessXP >= 30000 && results[0].businessXP <= 30025 && results[0].businessLevel === 3) {
                        con.query(`UPDATE business SET businessXP = 0 WHERE userId = '${interaction.user.id}';
                        UPDATE business SET businessLevel = 4 WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${interaction.user} You have successfully leveled up to **level 4**, congratulations!`)
                            ]
                        })
                    }

                    if (results[0].businessXP >= 50000 && results[0].businessXP <= 50025 && results[0].businessLevel === 4) {
                        con.query(`UPDATE business SET businessXP = 0 WHERE userId = '${interaction.user.id}';
                        UPDATE business SET businessLevel = 5 WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${interaction.user} You have successfully leveled up to **level 5**, congratulations!`)
                            ]
                        })
                    }

                    if (results[0].businessXP >= 75000 && results[0].businessXP <= 75025 && results[0].businessLevel === 5) {
                        con.query(`UPDATE business SET businessXP = 0 WHERE userId = '${interaction.user.id}';
                        UPDATE business SET businessLevel = 6 WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${interaction.user} You have successfully leveled up to **level 6**, congratulations!`)
                            ]
                        })
                    }

                    if (results[0].businessXP >= 100000 && results[0].businessXP <= 100025 && results[0].businessLevel === 6) {
                        con.query(`UPDATE business SET businessXP = 0 WHERE userId = '${interaction.user.id}';
                        UPDATE business SET businessLevel = 7 WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${interaction.user} You have successfully leveled up to **level 7**, congratulations!`)
                            ]
                        })
                    }

                    if (results[0].businessXP >= 125000 && results[0].businessXP <= 125025 && results[0].businessLevel === 7) {
                        con.query(`UPDATE business SET businessXP = 0 WHERE userId = '${interaction.user.id}';
                        UPDATE business SET businessLevel = 8 WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${interaction.user} You have successfully leveled up to **level 8**, congratulations!`)
                            ]
                        })
                    }

                    if (results[0].businessXP >= 150000 && results[0].businessXP <= 150025 && results[0].businessLevel === 8) {
                        con.query(`UPDATE business SET businessXP = 0 WHERE userId = '${interaction.user.id}';
                        UPDATE business SET businessLevel = 1 WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${interaction.user} You have successfully leveled up to **level 9**, congratulations!`)
                            ]
                        })
                    }

                    if (results[0].businessXP >= 200000 && results[0].businessXP <= 200025 && results[0].businessLevel === 9) {
                        con.query(`UPDATE business SET businessXP = 0 WHERE userId = '${interaction.user.id}';
                        UPDATE business SET businessLevel = 1 WHERE userId = '${interaction.user.id}';`)
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`${interaction.user} You have successfully leveled up to **level 10**, congratulations!`)
                            ]
                        })
                    }


                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`${emoji.error} You are not yet ready to **level up**, check your current progress with \`/business\`!`)
                        ]
                    })

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