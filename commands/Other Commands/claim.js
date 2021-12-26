const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json");
const ee = require("../../botconfig/embed.json");
const axios = require("axios");
const prettyMilliseconds = require("pretty-ms");
//const fetch = require("node-fetch");
module.exports = {
    name: "claim", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['claimvote', 'voteclaim'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => { // POSSIBLY THE ONE GIVING ERROR!
        con.query(`SELECT * FROM business LEFT JOIN cmdcooldowns ON business.userId = cmdcooldowns.userId WHERE business.userId = '${message.author.id}';`, async function (error, results, fields) {
            if (error) throw error;
            if (results.length && results) {
                try {
                    let cooldown = 43201000;
                    if (Date.now() >= results[0].claimcooldown + cooldown || results[0].claimcooldown == 0) {
                        let votes = await axios.get(`https://top.gg/api/bots/904757023797813339/check?userId=${message.author.id}`, { //BOTID AT 487!
                            headers: {
                                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwNDc1NzAyMzc5NzgxMzMzOSIsImJvdCI6dHJ1ZSwiaWF0IjoxNjM3NTIzNjM4fQ.GpNVwNqoDgSDX4DPA_OlDwiG5HFZkgZ3caOrw97tMeo'
                            }
                        });
                        let voted = votes.data.voted;

                        if (voted == 1) {
                            message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.success} You have claimed your **$100,000** from voting, come back in **12 hours** to vote again!`)
                                ]
                            })

                            con.query(`UPDATE business SET businessBalance = businessBalance + 100000 WHERE userId = '${message.author.id}';`)
                            con.query(`UPDATE cmdcooldowns SET claimcooldown = ${Date.now()} WHERE userId = '${message.author.id}'`);
                            return;
                        } else if (voted == 0) {
                            return message.reply({
                                embeds: [
                                    new MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`${emoji.error} You have not yet voted, please do so and try again.`)
                                ]
                            })
                        } else {
                            return message.reply({
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

                        return message.reply({
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
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`${emoji.error} You do not yet have a business registered.\nRegister a business with the \`${prefix}register\` command!`)
                    ]
                })
            }
        });

        /* VOTE API!
        return message.reply({
            embeds: [
                new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`This command is yet to be remade, the **Claim system** is currently not implemented.`)
            ]
        })
        */
        //return console.log(votes.data.voted)

        /* SECOND SYSTEM WITH FETCH INSTEAD OF AXIOS!
        authorizationToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ4NzMwMzE2MDc0NzEzMDkxMCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjMyNTAwMjYxfQ.nTzjyIEnlp_mTouNPXX_PtLLjV8qw5qQib8rA9gHW2w'
        //const url = https://top.gg/api/bots/487303160747130910/stats' // api endpoint
        fetch(`https://top.gg/api/bots/487303160747130910/check?userId=${message.author.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            })
            .then((res) => res.text())
            .then((json) => {
                let voted = JSON.parse(json).voted; // 1 for voted, 0 for not voted!
                console.log(voted)
                //console.log(json)
                //console.log(voted + " votes")

                con.query(`SELECT * FROM business LEFT JOIN usercoupons ON business.userId = usercoupons.userId LEFT JOIN cmdcooldowns ON business.userId = cmdcooldowns.userId WHERE business.userId = '${message.author.id}';`, async function (error, results, fields) {
                    if (error) throw error;
                    if (results.length && results) {
                        try {
                            let cooldown = 43201000;
                            if (Date.now() >= results[0].claimcooldown + cooldown || results[0].claimcooldown == 0) {
                                if (voted == 1) {
                                    message.reply({
                                        embeds: [
                                            new MessageEmbed()
                                            .setColor(ee.color)
                                            .setDescription(`:white_check_mark: You have claimed your **$50,000** reward and **2** coupons!`)
                                        ]
                                    })
                                    con.query(`UPDATE business SET businessBalance = businessBalance + 50000 WHERE userId = '${message.author.id}';
                                            UPDATE usercoupons SET normalCoupons = normalCoupons + 2 WHERE userId = '${message.author.id}';`)
                                    con.query(`UPDATE cmdcooldowns SET claimcooldown = ${Date.now()} WHERE userId = '${message.author.id}'`);
                                    return;
                                } else if (voted == 0) {

                                    return message.reply({
                                        embeds: [
                                            new MessageEmbed()
                                            .setColor(ee.color)
                                            .setDescription(`:x: You have not yet voted, please do so and try again.`)
                                        ]
                                    })

                                } else {

                                    return message.reply({
                                        embeds: [
                                            new MessageEmbed()
                                            .setColor(ee.wrongcolor)
                                            .setDescription(`Something went very wrong, please contact the developer.`)
                                        ]
                                    })

                                }
                            } else {
                                let cooldown = 43201000;
                                const timetobe = results[0].claimcooldown + cooldown;
                                const timenow = Date.now();
                                const timeleft = timetobe - timenow

                                return message.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.wrongcolor)
                                        .setDescription(`You must wait **${prettyMilliseconds(timeleft)}** before claiming your next vote reward.`)
                                    ]
                                })
                            }
                        } catch (err) {
                            console.log("Caught error from CLAIM CMD: " + err)
                        }
                    } else {
                        return message.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.wrongcolor)
                                .setDescription(`You do not yet have a business registered.\nRegister a business with the \`register\` command!`)
                            ]
                        })
                    }
                });
            })
        return;
        */
    },
};

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/