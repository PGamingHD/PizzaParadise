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
        name: 'slots',
        description: 'Enter a bet and see what you can win from a slots bet!',
        options: [{
            name: 'bet',
            description: 'How much do you want to bet?',
            type: Constants.ApplicationCommandOptionTypes.NUMBER,
            required: true,
        }],
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args, con) => {
            con.query(`SELECT * FROM business LEFT JOIN premiumuser ON business.userId = premiumuser.userId WHERE business.userId = '${interaction.user.id}';`, function (error, results, fields) {
                if (error) throw error;
                if (results && results.length) {
                    const bet = args[0];
                    if (results[0].premiumLevel === 0) {
                        if (bet < 10 || bet > 5000) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`Please select a valid bet between **$10** - **$5,000**!\n\nHint: Did you know that you can purchase a rank to get a higher bet max?`)
                                ],
                                ephemeral: true,
                            })
                        }
                    } else if (results[0].premiumLevel === 1) {
                        if (bet < 10 || bet > 8000) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`Please select a valid bet between **$10** - **$8,000**!`)
                                ],
                                ephemeral: true,
                            })
                        }
                    } else if (results[0].premiumLevel === 2) {
                        if (bet < 10 || bet > 20000) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`Please select a valid bet between **$10** - **$20,000**!`)
                                ],
                                ephemeral: true,
                            })
                        }
                    } else if (results[0].premiumLevel === 3) {
                        if (bet < 10 || bet > 50000) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`Please select a valid bet between **$10** - **$50,000**!`)
                                ],
                                ephemeral: true,
                            })
                        }
                    } else if (results[0].premiumLevel === 4) {
                        if (bet < 10 || bet > 100000) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`Please select a valid bet between **$10** - **$100,000**!`)
                                ],
                                ephemeral: true,
                            })
                        }
                    } else if (results[0].premiumLevel === 5) {
                        if (bet < 10 || bet > 250000) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`Please select a valid bet between **$10** - **$250,000**!`)
                                ],
                                ephemeral: true,
                            })
                        }
                    }

                    con.query(`UPDATE business SET businessBalance = businessBalance - ${bet} WHERE userId = '${interaction.user.id}';`);
                    let slots = ["💎", "🍋", "🍎", "🍒", "💰", "❔"];
                    let result1 = Math.floor((Math.random() * slots.length));
                    let result2 = Math.floor((Math.random() * slots.length));
                    let result3 = Math.floor((Math.random() * slots.length));
                    let name = interaction.user.tag;
                    let icon = interaction.user.displayAvatarURL;
                    if (slots[result1] === slots[result2] && slots[result1] === slots[result3]) {
                        let money = bet * 36;
                        con.query(`UPDATE business SET businessBalance = businessBalance + ${money} WHERE userId = '${message.author.id}';`)
                        let embed = new MessageEmbed()
                            .setFooter('You won!', icon)
                            .setTitle(':slot_machine: Slots :slot_machine:')
                            .addField(`Result:`, `\`\`\`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n|${slots[result1]}| |${slots[result2]}| |${slots[result3]}|\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\`\`\``)
                            .setColor(ee.color)
                        interaction.reply({
                            embeds: [embed]
                        });
                    } else {
                        let embed2 = new MessageEmbed()
                            .setFooter('You lost!', icon)
                            .setTitle(':slot_machine: Slots :slot_machine:')
                            .addField(`Result:`, `\`\`\`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n|${slots[result1]}| |${slots[result2]}| |${slots[result3]}|\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\`\`\``)
                            .setColor(ee.wrongcolor)
                        interaction.reply({
                            embeds: [embed2]
                        });
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