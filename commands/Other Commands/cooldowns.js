const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json")
const ee = require("../../botconfig/embed.json");
const config = require("../../botconfig/config.json");
const prettyMilliseconds = require("pretty-ms")
const {
    evaluate
} = require("mathjs");

module.exports = {
    name: "cooldowns",
    aliases: ['cds', 'cd', 'cooldown'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        con.query(`SELECT * FROM cmdcooldowns LEFT JOIN premiumuser ON cmdcooldowns.userId = premiumuser.userId WHERE cmdcooldowns.userId = '${message.author.id}'`, function (error, results, fields) {
            if (error) throw error;
            if (results && results.length) {
                let dailycheck = results[0].dailycooldown;
                let extracheck = results[0].dailybonuscooldown;
                //let workcheck = results[0].workcooldown;
                //let tipcheck = results[0].tipcooldown;
                let votecheck = results[0].claimcooldown;

                let embed = new MessageEmbed()
                embed.setColor(ee.color)
                embed.setFooter(message.author.tag)
                embed.setTitle(`🕐 Business Cooldowns 🕐`)

                if (Date.now() >= dailycheck + 86400000 || dailycheck === 0) {
                    embed.addField(`Daily`, `${emoji.success} **READY**`, true)
                } else {
                    const timetobe = dailycheck + 86400000;
                    const timenow = Date.now();
                    const timeleft = timetobe - timenow;
                    embed.addField(`Daily`, `${emoji.error} ${prettyMilliseconds(timeleft)}`, true)
                }
                if (Date.now() >= votecheck + 43201000 || votecheck == 0) {
                    embed.addField(`Vote`, `${emoji.success} **READY**`, true)
                } else {
                    const timetobe = votecheck + 43201000;
                    const timenow = Date.now();
                    const timeleft = timetobe - timenow;
                    embed.addField(`Vote`, `${emoji.error} ${prettyMilliseconds(timeleft)}`, true)
                }
                if (results[0].premiumLevel >= 1) {
                    if (Date.now() >= extracheck + 86400000 || extracheck === 0) {
                        embed.addField(`Premium Daily`, `${emoji.success} **READY**`, true)
                    } else {
                        const timetobe = extracheck + 86400000;
                        const timenow = Date.now();
                        const timeleft = timetobe - timenow;
                        embed.addField(`Premium Daily`, `${emoji.error} ${prettyMilliseconds(timeleft)}`, true)
                    }
                }
                return message.reply({
                    embeds: [embed]
                })

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