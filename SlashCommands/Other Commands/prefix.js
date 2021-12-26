    const {
        Client,
        CommandInteraction,
        MessageEmbed,
        MessageActionRow,
        MessageButton,
        Constants
    } = require('discord.js');
    const ee = require('../../botconfig/embed.json');
    const emoji = require('../../botconfig/emojis.json');
    const prettyMilliseconds = require('pretty-ms');
    const config = require('../../botconfig/config.json');

    module.exports = {
        name: 'prefix',
        description: 'Change or check the current server prefix!',
        options: [{
            name: 'newprefix',
            description: `Set a new server prefix if wanted!`,
            type: Constants.ApplicationCommandOptionTypes.STRING,
        }],
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args, con, prefix) => {
            let newprefix = interaction.options.get('newprefix');
            //return console.log(newprefix);
            //return console.log(prefix)

            if (!newprefix) {
                let embed = new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`My current guild prefix is set to: \`[ ${prefix} ]\``)
                    .setFooter(`Want to change it? Use .prefix set (new) to change my prefix!`)
                return interaction.reply({
                    embeds: [embed]
                })
            } else {
                //IF PREFIX PROVIDED!
                if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                    let embed = new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`${emoji.error} You require the \`Administrator\` permission to use this command.`)
                    return interaction.reply({
                        embeds: [embed],
                        epehemerl: true
                    })
                }

                if (newprefix.value.length <= 5 && newprefix.value.length >= 1) {
                    con.query(`SELECT * FROM guildsettings WHERE guildId = '${interaction.guild.id}';`, function (error, results, fields) {
                        if (results && results.length) {
                            con.query(`UPDATE guildsettings SET guildPrefix = '${newprefix.value}' WHERE guildId = '${interaction.guild.id}';`)
                        } else {
                            con.query(`INSERT INTO guildsettings (guildId, guildPrefix) VALUES ('${interaction.guild.id}', '${newprefix.value}')`)
                        }

                        let embed = new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`You successfully set the prefix to \`[ ${newprefix.value} ]\``)
                        return interaction.reply({
                            embeds: [embed]
                        })
                    });
                } else {
                    let embed = new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`${emoji.error} Please include a prefix between 1-5 characters long to switch to.`)
                    return interaction.reply({
                        embeds: [embed],
                        epehemerl: true
                    })
                }
            }
        }
    }

    /*

    Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
    Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
    Other than that, please do note that it is required if you are using this to mention the original developer
    Original Developer - PGamingHD#0666
    
    */