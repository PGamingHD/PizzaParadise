const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Constants
} = require("discord.js");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");

module.exports = {
    name: 'redeemkey',
    description: 'Redeem a purchased/recieved item key for the bot!',
    options: [{
        name: 'key',
        description: `Enter a valid key to redeem with this command!`,
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING,
    }],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, con, prefix) => {
        //let keyval = interaction.options.get('key')
        //console.log(keyval.value)
        if (interaction.guild.id === '890700837226151976') {
            con.query(`SELECT * FROM business WHERE userId = '${interaction.user.id}'`, function (error, results, fields) {
                if (error) throw error;
                if (results && results.length) {
                    let key = interaction.options.get('key'); //GET OPTIONS!
                    if (key.value) {
                        con.query(`SELECT * FROM keysystem WHERE useableKey = '${key.value}';`, function (error, results, fields) {
                            if (error) throw error;
                            if (results && results.length) {
                                let type = results[0].rewardType;
                                if (type === 'premType1') {
                                    con.query(`UPDATE premiumuser SET premiumLevel = 1 WHERE userId = '${interaction.user.id}';
                                UPDATE business SET businessBalance = businessBalance + 1000000 WHERE userId = '${interaction.user.id}';
                                DELETE FROM keysystem WHERE useableKey = '${key.value}';
                                UPDATE userprofile SET userRank = 'Assistant Baker' WHERE userId = '${interaction.user.id}';
                                UPDATE userprofile SET userRankLink = 'https://cdn.discordapp.com/attachments/900434193643896882/911369475641720832/premiumtier1.png' WHERE userId = '${interaction.user.id}';`)
                                    let prem1 = interaction.guild.roles.cache.get('912384918355599391'); //ASSISTANT BAKER ROLE
                                    if (!interaction.member.roles.cache.has(prem1.id)) {
                                        interaction.member.roles.add(prem1);
                                    }
                                    return interaction.reply({
                                        embeds: [
                                            new MessageEmbed()
                                            .setColor(ee.color)
                                            .setTitle(`🎉 Assistant Baker Key redeemed 🎉`)
                                            .setDescription(`You have successfully redeemed an **Assistant Baker** key!\nYour rank bonuses has now been added to your account!`)
                                        ]
                                    })
                                } else if (type === 'premType2') {
                                    con.query(`UPDATE premiumuser SET premiumLevel = 2 WHERE userId = '${interaction.author.id}';
                                UPDATE business SET businessBalance = businessBalance + 5000000 WHERE userId = '${interaction.author.id}';
                                DELETE FROM keysystem WHERE useableKey = '${key.value}';
                                UPDATE userprofile SET userRank = 'Apprentice Baker' WHERE userId = '${interaction.author.id}';
                                UPDATE userprofile SET userRankLink = 'https://cdn.discordapp.com/attachments/900434193643896882/911383211198795876/premiumtier2.png' WHERE userId = '${interaction.user.id}';`)
                                    let prem2 = interaction.guild.roles.cache.get('912385164708024430'); //APPRENTICE BAKER ROLE
                                    if (!interaction.member.roles.cache.has(prem2.id)) {
                                        interaction.member.roles.add(prem2);
                                    }
                                    return interaction.reply({
                                        embeds: [
                                            new MessageEmbed()
                                            .setColor(ee.color)
                                            .setTitle(`🎉 Apprentice Baker Key redeemed 🎉`)
                                            .setDescription(`You have successfully redeemed an **Apprentice Baker** key!\nYour rank bonuses has now been added to your account!`)
                                        ]
                                    })
                                } else if (type === 'premType3') {
                                    con.query(`UPDATE premiumuser SET premiumLevel = 3 WHERE userId = '${interaction.user.id}';
                                UPDATE business SET businessBalance = businessBalance + 10000000 WHERE userId = '${interaction.user.id}';
                                DELETE FROM keysystem WHERE useableKey = '${key.value}';
                                UPDATE userprofile SET userRank = 'Ordinary Baker' WHERE userId = '${interaction.user.id}';
                                UPDATE userprofile SET userRankLink = 'https://cdn.discordapp.com/attachments/900434193643896882/912417729292693594/premumtier3.png' WHERE userId = '${interaction.user.id}';`)
                                    let prem3 = interaction.guild.roles.cache.get('912385231351332944'); //ORDINARY BAKER ROLE
                                    if (!interaction.member.roles.cache.has(prem3.id)) {
                                        interaction.member.roles.add(prem3);
                                    }
                                    return interaction.reply({
                                        embeds: [
                                            new MessageEmbed()
                                            .setColor(ee.color)
                                            .setTitle(`🎉 Ordinary Baker Key redeemed 🎉`)
                                            .setDescription(`You have successfully redeemed an **Ordinary Baker** key!\nYour rank bonuses has now been added to your account!`)
                                        ]
                                    })
                                } else if (type === 'premType4') {
                                    con.query(`UPDATE premiumuser SET premiumLevel = 4 WHERE userId = '${interaction.user.id}';
                                UPDATE business SET businessBalance = businessBalance + 15000000 WHERE userId = '${interaction.user.id}';
                                DELETE FROM keysystem WHERE useableKey = '${key.value}';
                                UPDATE userprofile SET userRank = 'Professional Baker' WHERE userId = '${interaction.user.id}';
                                UPDATE userprofile SET userRankLink = 'https://cdn.discordapp.com/attachments/900434193643896882/912416700480237658/premiumtier4.gif' WHERE userId = '${interaction.user.id}';`)
                                    let prem4 = interaction.guild.roles.cache.get('912385288091881553'); //PROFESSIONAL BAKER ROLE
                                    if (!interaction.member.roles.cache.has(prem4.id)) {
                                        interaction.member.roles.add(prem4);
                                    }
                                    return interaction.reply({
                                        embeds: [
                                            new MessageEmbed()
                                            .setColor(ee.color)
                                            .setTitle(`🎉 Professional Baker Key redeemed 🎉`)
                                            .setDescription(`You have successfully redeemed a **Professional Baker** key!\nYour rank bonuses has now been added to your account!`)
                                        ]
                                    })
                                } else if (type === 'premType5') {
                                    con.query(`UPDATE premiumuser SET premiumLevel = 5 WHERE userId = '${interaction.user.id}';
                                UPDATE business SET businessBalance = businessBalance + 30000000 WHERE userId = '${interaction.user.id}';
                                DELETE FROM keysystem WHERE useableKey = '${key.value}';
                                UPDATE userprofile SET userRank = 'Master Baker' WHERE userId = '${interaction.user.id}';
                                UPDATE userprofile SET userRankLink = 'https://cdn.discordapp.com/attachments/900434193643896882/912416700199227392/premiumtier5.gif' WHERE userId = '${interaction.user.id}';`)
                                    let prem5 = interaction.guild.roles.cache.get('912385362062614548'); //MASTER BAKER ROLE
                                    if (!interaction.member.roles.cache.has(prem5.id)) {
                                        interaction.member.roles.add(prem5);
                                    }
                                    return interaction.reply({
                                        embeds: [
                                            new MessageEmbed()
                                            .setColor(ee.color)
                                            .setTitle(`🎉 Master Baker Key redeemed 🎉`)
                                            .setDescription(`You have successfully redeemed a **Master Baker** key!\nYour rank bonuses has now been added to your account!`)
                                        ]
                                    })
                                } else if (type === 'money') {
                                    con.query(`UPDATE business SET businessBalance = businessBalance + ${results[0].rewardValue} WHERE userId = '${interaction.user.id}';
                                DELETE FROM keysystem WHERE useableKey = '${key.value}';`)
                                    let money = interaction.guild.roles.cache.get('912395307407528026'); //SUPPORTER ROLE
                                    if (!interaction.member.roles.cache.has(money.id)) {
                                        interaction.member.roles.add(money);
                                    }
                                    return interaction.reply({
                                        embeds: [
                                            new MessageEmbed()
                                            .setColor(ee.color)
                                            .setTitle(`🎉 Money Key redeemed 🎉`)
                                            .setDescription(`You have successfully redeemed a **Money** key!\nYour bonuses has now been added to your account!`)
                                        ]
                                    })
                                }
                            } else {
                                return interaction.reply({
                                    embeds: [
                                        new MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`The key \`[ ${key.value} ]\` could not be found in the database!\nPlease try again or contact Support. **(Make sure there are no spaces)**`)
                                    ]
                                })
                            }
                        });
                    } else {
                        return interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`Please input a key to redeem!`)
                            ]
                        })
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
        } else {
            return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.wrongcolor)
                    .setDescription(`${emoji.error} This command may only be used in the support server, use \`/support\` for the link!`)
                ]
            })
        }
    }
}

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/