const {
    Client,
    CommandInteraction,
    MessageEmbed
} = require('discord.js');
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");
const axios = require("axios");
const prettyMilliseconds = require("pretty-ms");

module.exports = {
    name: 'claim',
    description: 'Claim the voting price, if you voted!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, con, prefix) => {
        con.query(`SELECT * FROM business LEFT JOIN cmdcooldowns ON business.userId = cmdcooldowns.userId WHERE business.userId = '${interaction.user.id}';`, async function (error, results, fields) {
            if (error) throw error;
            if (results.length && results) {
                try {
                    let cooldown = 43201000;
                    if (Date.now() >= results[0].claimcooldown + cooldown || results[0].claimcooldown == 0) {
                        let votes = await axios.get(`https://top.gg/api/bots/904757023797813339/check?userId=${interaction.user.id}`, { //BOTID AT 487!
                            headers: {
                                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwNDc1NzAyMzc5NzgxMzMzOSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjM3NTIzNjM4fQ.GpNVwNqoDgSDX4DPA_OlDwiG5HFZkgZ3caOrw97tMeo'
                            }
                        });
                        let voted = votes.data.voted;

                        if (voted == 1) {
                            interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You have claimed your **$100,000** from voting, come back in **12 hours** to vote again!`)
                                ]
                            })

                            con.query(`UPDATE business SET businessBalance = businessBalance + 100000 WHERE userId = '${interaction.user.id}';`)
                            con.query(`UPDATE cmdcooldowns SET claimcooldown = ${Date.now()} WHERE userId = '${interaction.user.id}'`);
                            return;
                        } else if (voted == 0) {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.error} You have not yet voted, please do so and try again.`)
                                ]
                            })
                        } else {
                            return interaction.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.wrongcolor)
                                    .setDescription(`${emoji.error} Something went very wrong, please contact the developer.`)
                                ]
                            })
                        }
                    } else {
                        let cooldown = 43201000;
                        const timetobe = results[0].claimcooldown + cooldown;
                        const timenow = Date.now();
                        const timeleft = timetobe - timenow

                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`${emoji.error} You must wait **${prettyMilliseconds(timeleft)}** before claiming your next vote reward.`)
                            ]
                        })
                    }
                } catch (err) {
                    console.log("Caught error from CLAIM CMD: " + err)
                }
            } else {
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`${emoji.error} You do not yet have a business registered.\nRegister a business with the \`/register\` command!`)
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