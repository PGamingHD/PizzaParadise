const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json");
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "business", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['bal', 'balance', 'money', 'businessinfo'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        con.query(`SELECT * FROM business LEFT JOIN userprofile ON business.userId = userprofile.userId WHERE business.userId = '${message.author.id}' LIMIT 2;`, function (err, rows) {
            if (err) throw err;
            if (rows && rows.length) {
                if (rows[0].businessLevel < 10) {
                    let maxval = 0; //XP NEEDED FOR NEXT RANK!
                    if (rows[0].businessLevel === 0) {
                        maxval = 2500; //GET UP TO LVL 1
                    }
                    if (rows[0].businessLevel === 1) {
                        maxval = 5000; //GET UP TO LVL 2
                    }
                    if (rows[0].businessLevel === 2) {
                        maxval = 15000; //GET UP TO LVL 3
                    }
                    if (rows[0].businessLevel === 3) {
                        maxval = 30000; //GET UP TO LVL 4
                    }
                    if (rows[0].businessLevel === 4) {
                        maxval = 50000; //GET UP TO LVL 5
                    }
                    if (rows[0].businessLevel === 5) {
                        maxval = 75000; //GET UP TO LVL 6
                    }
                    if (rows[0].businessLevel === 6) {
                        maxval = 100000; //GET UP TO LVL 7
                    }
                    if (rows[0].businessLevel === 7) {
                        maxval = 125000; //GET UP TO LVL 8
                    }
                    if (rows[0].businessLevel === 8) {
                        maxval = 150000; //GET UP TO LVL 9
                    }
                    if (rows[0].businessLevel === 9) {
                        maxval = 200000; //GET UP TO LVL 10
                    }
                    const value = rows[0].businessXP; //VALUE (USERS CURRENT XP)!
                    const maxValue = maxval; //MAX VALUE, WHAT IS TO BE 100%!
                    const size = 20; // SIZE OF BAR ITSELF!
                    const percentage = value / maxValue; // Calculate the percentage of the bar
                    const progress = Math.round((size * percentage)); // Calculate the number of square caracters to fill the progress side.
                    const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.

                    const progressText = '▰'.repeat(progress); // Repeat is creating a string with progress * caracters in it
                    const emptyProgressText = '▱'.repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
                    const percentageText = Math.round(percentage * 100) + '%'; // Displaying the percentage of the bar

                    const bar = progressText + emptyProgressText; // Creating the bar

                    const remake = Date.now() - rows[0].businessCreated;
                    const remade = remake / 86400000;
                    const remadefinal = Math.floor(remade);

                    let embed = new MessageEmbed()
                        .setColor(ee.color)
                        .setThumbnail(message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .addField(`Business Name`, `:small_red_triangle: ${rows[0].businessName}`)
                        .addField(`Balance`, `${emoji.currency} $${rows[0].businessBalance.toLocaleString('en-US')}`)
                        //.addField(`Income (per hour)`, `${emoji.bank} $${rows[0].businessIncome.toLocaleString('en-US')}`)
                        .addField(`Sold Pizzas`, `${emoji.pizza} ${rows[0].businessProduced.toLocaleString('en-US')}`)
                        .addField(`Booster`, `${emoji.booster} ${rows[0].businessBooster}x`)
                        .addField(`Business Age`, `⏳ ${remadefinal} days`)
                        .setFooter(`${rows[0].userRank}`, `${rows[0].userRankLink}`)
                    embed.addField(`Profile Level`, `🎚️ ${rows[0].businessLevel}\n\n**Percentage Bar - ${percentageText}**\n${bar}`)
                    //.setFooter(`${rows[0].userRankLink}`)
                    //if (rows[0].businessLevel === 0) {
                    //    embed.addField(`Level`, `🎚️ *Join our **Support Server** to get level (.support)*`)
                    //} else {
                    //    embed.addField(`Level`, `🎚️ ${rows[0].businessLevel}`)
                    //}
                    return message.reply({
                        embeds: [embed]
                    });
                } else {

                    const remake = Date.now() - rows[0].businessCreated;
                    const remade = remake / 86400000;
                    const remadefinal = Math.floor(remade);

                    let embed = new MessageEmbed()
                        .setColor(ee.color)
                        .setThumbnail(message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .addField(`Business Name`, `:small_red_triangle: ${rows[0].businessName}`)
                        .addField(`Balance`, `${emoji.currency} $${rows[0].businessBalance.toLocaleString('en-US')}`)
                        //.addField(`Income (per hour)`, `${emoji.bank} $${rows[0].businessIncome.toLocaleString('en-US')}`)
                        .addField(`Sold Pizzas`, `${emoji.pizza} ${rows[0].businessProduced.toLocaleString('en-US')}`)
                        .addField(`Booster`, `${emoji.booster} ${rows[0].businessBooster}x`)
                        .addField(`Business Age`, `⏳ ${remadefinal} days`)
                        .setFooter(`${rows[0].userRank}`, `${rows[0].userRankLink}`)
                    embed.addField(`Profile Level`, `🎚️ 10 (MAXED)\n\n**Percentage Bar - 100%**\n▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰`)
                    //.setFooter(`${rows[0].userRankLink}`)
                    //if (rows[0].businessLevel === 0) {
                    //    embed.addField(`Level`, `🎚️ *Join our **Support Server** to get level (.support)*`)
                    //} else {
                    //    embed.addField(`Level`, `🎚️ ${rows[0].businessLevel}`)
                    //}
                    return message.reply({
                        embeds: [embed]
                    });
                }
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