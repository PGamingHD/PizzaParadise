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
    name: 'prefix',
    aliases: ['pre', 'pref'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        if (!args[0]) {
            let embed = new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`My current guild prefix is set to: \`[ ${prefix} ]\``)
                .setFooter(`Want to change it? Use .prefix set (new) to change my prefix!`)
            return message.reply({
                embeds: [embed]
            })
        }

        if (args[0].toLowerCase() === 'set' || args[0].toLowerCase() === 'change') {
            if (!message.member.permissions.has("ADMINISTRATOR")) {
                let embed = new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`${emoji.error} You require the \`Administrator\` permission to use this command.`)
                return message.reply({
                    embeds: [embed]
                })
            }

            if (!args[1]) {
                let embed = new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`${emoji.error} Please include a prefix between 1-5 characters long to switch to.`)
                return message.reply({
                    embeds: [embed]
                })
            }

            if (args[1].length > 5) {
                let embed = new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`${emoji.error} The prefix may only contain the maximum of 5 characters.`)
                return message.reply({
                    embeds: [embed]
                })
            }

            con.query(`SELECT * FROM guildsettings WHERE guildId = '${message.guild.id}';`, function (error, results, fields) {
                if (results && results.length) {
                    con.query(`UPDATE guildsettings SET guildPrefix = '${args[1]}' WHERE guildId = '${message.guild.id}';`)
                } else {
                    con.query(`INSERT INTO guildsettings (guildId, guildPrefix) VALUES ('${message.guild.id}', '${args[1]}')`)
                }

                let embed = new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`You successfully set the prefix to \`[ ${args[1]} ]\``)
                return message.reply({
                    embeds: [embed]
                })
            });
        }
    },
};

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/