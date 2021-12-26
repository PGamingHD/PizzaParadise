const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const client = require("../index");
const ee = require("../botconfig/embed.json");
const emoji = require("../botconfig/emojis.json");
const {
    onCoolDown,
    replacemsg
} = require("../handler/functions");
const ms = require("ms")

client.on("interactionCreate", async (interaction) => {
    function GetGuild(guildID) {
        return new Promise((resolve, reject) => {
            client.connection.query(`SELECT * FROM guildsettings WHERE guildId = '${guildID}';`, function (error, results, fields) {
                resolve(results)
            });
        });
    }

    let prefix;
    const [guild] = await GetGuild(interaction.guildId);
    if (!guild) {
        prefix = client.config.prefix;
    } else {
        prefix = guild.guildPrefix
    }

    // Slash Command Handling
    if (interaction.isCommand()) {
        //await interaction.deferReply({ephemeral: false})

        const buttonrow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setURL("https://www.discord.gg/pxySje4GPC")
                .setStyle("LINK")
                .setLabel("Support Server")
            )

        if (!interaction.channel.permissionsFor(interaction.guild.me).has("SEND_MESSAGES") || !interaction.channel.permissionsFor(interaction.guild.me).has("EMBED_LINKS") || !interaction.channel.permissionsFor(interaction.guild.me).has("USE_EXTERNAL_EMOJIS") || !interaction.channel.permissionsFor(interaction.guild.me).has("READ_MESSAGE_HISTORY")) return interaction.author.send({
            embeds: [
                new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setTitle(`${emoji.error} Missing Permissions ${emoji.error}`)
                .setDescription(`Looks like I do not have **permission** to send messages in that channel, please **fix it** before trying to use commands there again. Try contacting the **server owner**!\n\nPermissions I require in channels: \`Send Messages\`, \`Embed Links\`, \`Use External Emoji\`, \`Read Message History\`!`)
            ],
            components: [buttonrow]
        })

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd) {
            let embed = new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription(`${emoji.error} An error has occured, please contact the developer if this is a mistake.`)
            return interaction.reply({
                embeds: [embed],
                epehemeral: true
            });
        }

        if (onCoolDown(interaction, cmd)) {
            return interaction.reply({
                ephemeral: true,
                embeds: [new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(replacemsg(`${emoji.error} Cooldown active, please wait **%{timeleft}%** more Second(s)`, {
                        prefix: prefix,
                        command: cmd,
                        timeLeft: onCoolDown(interaction, cmd)
                    }))
                ]
            });
        }

        const con = client.connection;
        client.connection.query(`SELECT * FROM userblacklists where userId = '${interaction.user.id}'`, function (error, results, fields) {
            if (error) throw error;
            if (results && results.length) {
                const buttonrow = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setURL(config.supporturl)
                    .setStyle("LINK")
                    .setLabel("Support Server")
                );
                return interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`${emoji.error} Blacklisted ${emoji.error}`)
                        .setFooter(ee.footertext, ee.footericon)
                        .setDescription(
                            `**Looks like you were Blacklisted from this bot!**\n\nDo you feel like this is a mistake? Please contact our Support team.\nYou may find our Support Server by clicking the button \`below\` and\nWe shall help you resolve this as soon as possible, please DM ModMail upon joining to get further assistance with this.`
                        ),
                    ],
                    components: [buttonrow],
                });
            } else {
                client.connection.query(`select * from guildblacklists where guildId = '${interaction.guild.id}'`, async (error, results, fields) => {
                    if (error) throw error;
                    if (results && results.length) { //&& !config.ownerID.includes.message.author.id
                        const buttonrow = new MessageActionRow().addComponents(
                            new MessageButton()
                            .setURL(config.supporturl)
                            .setStyle("LINK")
                            .setLabel("Support Server")
                        );
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setTitle(`${emoji.error} Blacklisted ${emoji.error}`)
                                .setFooter(ee.footertext, ee.footericon)
                                .setDescription(
                                    `**Looks like this guild has been blacklisted from using this bot!**\n\nDo you feel like this is a mistake? Please contact our Support team.\nYou may find our Support Server by clicking the button \`below\` and\nWe shall help you resolve this as soon as possible, please DM ModMail upon joining to get further assistance with this.`
                                )
                            ],
                            components: [buttonrow],
                        });
                    } else {
                        client.connection.query(`UPDATE totalcommands SET totalSlashCommands = totalSlashCommands + 1`);
                        //INTERACTION BELOW
                        const args = [];

                        for (let option of interaction.options.data) {
                            if (option.type === "SUB_COMMAND") {
                                if (option.name) args.push(option.name);
                                option.options?.forEach((x) => {
                                    if (x.value) args.push(x.value);
                                });
                            } else if (option.value) args.push(option.value);
                        }
                        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

                        if (!interaction.member.permissions.has(cmd.userPermissions || []))
                            return interaction.reply({
                                content: "You do not have permissions to use this command!",
                            });

                        await cmd.run(client, interaction, args, con, prefix);
                        //INTERACTION ABOVE
                        client.connection.query(`SELECT * FROM business WHERE userId = '${interaction.user.id}';`, async function (error, results, fields) {
                            if (results && results.length) { //< less than
                                if (results[0].businessXP >= 2500 && results[0].businessLevel === 0 || results[0].businessXP >= 5000 && results[0].businessLevel === 1 || results[0].businessXP >= 15000 && results[0].businessLevel === 2 || results[0].businessXP >= 30000 && results[0].businessLevel === 3 || results[0].businessXP >= 50000 && results[0].businessLevel === 4 || results[0].businessXP >= 75000 && results[0].businessLevel === 5 || results[0].businessXP >= 100000 && results[0].businessLevel === 6 || results[0].businessXP >= 125000 && results[0].businessLevel === 7 || results[0].businessXP >= 150000 && results[0].businessLevel === 8 || results[0].businessXP >= 200000 && results[0].businessLevel === 9 || results[0].businessLevel === 10) {
                                    return;
                                } else {
                                    let randomXP = Math.floor(Math.random() * (20 - 10)) + 10;

                                    client.connection.query(`UPDATE business SET businessXP = businessXP + ${randomXP} WHERE userId = '${interaction.user.id}';`)
                                }
                            }
                        });
                    }
                });
            }
            //IF GOES WRONG, PLACE COMMAND.RUN FUNCTION HERE AGAIN (AND DELETE QUERY ABOVE)! -- await command.run(client, message, args, con);
        });

        /*
        if (interaction.guild.id === '890700837226151976') { // && !config.ownerID.includes(message.author.id)
            let allowedchannels = ["890896655946252289", "911381131969048588", "910815863249182750", "906556250085527603"]
            if (!allowedchannels.includes(interaction.channel.id)) {
                return interaction.followUp({
                    content: `${emoji.error} Please redirect **PizzaParadise commands** to one of our **play channels**!`, ephemeral: true
                })
            }
        }
        */
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({
            ephemeral: false
        });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/