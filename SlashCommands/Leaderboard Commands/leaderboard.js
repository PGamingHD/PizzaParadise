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
        name: 'leaderboard',
        description: 'Display a specific leaderboard, which one though?',
        type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
        required: true,
        options: [{
                name: 'sold',
                description: 'Display the sold leaderboard, top 10 users!',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
            {
                name: 'money',
                description: 'Display the money leaderboard, top 10 users!',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
            {
                name: 'age',
                description: 'Display the age leaderboard, top 10 users!',
                type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            },
        ],
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args, con) => {

            if (interaction.options.getSubcommand() === 'sold') {
                con.query(`SELECT businessProduced, businessName FROM business ORDER BY businessProduced DESC LIMIT 10;`, function (error, results, fields) {
                    if (error) throw error;
                    let embed = new MessageEmbed()
                    embed.setTitle(`PizzaParadise Sold Leaderboard`)
                    embed.setThumbnail(ee.footericon)
                    embed.setColor(ee.color)

                    try {
                        embed.addField(`1. ${results[0].businessName}`, `${emoji.pizza} ${results[0].businessProduced.toLocaleString('en-US')} Pizzas`)
                    } catch {}
                    try {
                        embed.addField(`2. ${results[1].businessName}`, `${emoji.pizza} ${results[1].businessProduced.toLocaleString('en-US')} Pizzas`)
                    } catch {}
                    try {
                        embed.addField(`3. ${results[2].businessName}`, `${emoji.pizza} ${results[2].businessProduced.toLocaleString('en-US')} Pizzas`)
                    } catch {}
                    try {
                        embed.addField(`4. ${results[3].businessName}`, `${emoji.pizza} ${results[3].businessProduced.toLocaleString('en-US')} Pizzas`)
                    } catch {}
                    try {
                        embed.addField(`5. ${results[4].businessName}`, `${emoji.pizza} ${results[4].businessProduced.toLocaleString('en-US')} Pizzas`)
                    } catch {}
                    try {
                        embed.addField(`6. ${results[5].businessName}`, `${emoji.pizza} ${results[5].businessProduced.toLocaleString('en-US')} Pizzas`)
                    } catch {}
                    try {
                        embed.addField(`7. ${results[6].businessName}`, `${emoji.pizza} ${results[6].businessProduced.toLocaleString('en-US')} Pizzas`)
                    } catch {}
                    try {
                        embed.addField(`8. ${results[7].businessName}`, `${emoji.pizza} ${results[7].businessProduced.toLocaleString('en-US')} Pizzas`)
                    } catch {}
                    try {
                        embed.addField(`9. ${results[8].businessName}`, `${emoji.pizza} ${results[8].businessProduced.toLocaleString('en-US')} Pizzas`)
                    } catch {}
                    try {
                        embed.addField(`10. ${results[9].businessName}`, `${emoji.pizza} ${results[9].businessProduced.toLocaleString('en-US')} Pizzas`)
                    } catch {}
                    return interaction.reply({
                        embeds: [embed]
                    })
                });
            }

            if (interaction.options.getSubcommand() === 'money') {
                con.query(`SELECT businessBalance, businessName FROM business ORDER BY businessBalance DESC LIMIT 10;`, function (error, results, fields) {
                    if (error) throw error;
                    let embed = new MessageEmbed()
                    embed.setTitle(`PizzaParadise Money Leaderboard`)
                    embed.setThumbnail(ee.footericon)
                    embed.setColor(ee.color)

                    try {
                        embed.addField(`1. ${results[0].businessName}`, `${emoji.currency} $${results[0].businessBalance.toLocaleString('en-US')}`)
                    } catch {}
                    try {
                        embed.addField(`2. ${results[1].businessName}`, `${emoji.currency} $${results[1].businessBalance.toLocaleString('en-US')}`)
                    } catch {}
                    try {
                        embed.addField(`3. ${results[2].businessName}`, `${emoji.currency} $${results[2].businessBalance.toLocaleString('en-US')}`)
                    } catch {}
                    try {
                        embed.addField(`4. ${results[3].businessName}`, `${emoji.currency} $${results[3].businessBalance.toLocaleString('en-US')}`)
                    } catch {}
                    try {
                        embed.addField(`5. ${results[4].businessName}`, `${emoji.currency} $${results[4].businessBalance.toLocaleString('en-US')}`)
                    } catch {}
                    try {
                        embed.addField(`6. ${results[5].businessName}`, `${emoji.currency} $${results[5].businessBalance.toLocaleString('en-US')}`)
                    } catch {}
                    try {
                        embed.addField(`7. ${results[6].businessName}`, `${emoji.currency} $${results[6].businessBalance.toLocaleString('en-US')}`)
                    } catch {}
                    try {
                        embed.addField(`8. ${results[7].businessName}`, `${emoji.currency} $${results[7].businessBalance.toLocaleString('en-US')}`)
                    } catch {}
                    try {
                        embed.addField(`9. ${results[8].businessName}`, `${emoji.currency} $${results[8].businessBalance.toLocaleString('en-US')}`)
                    } catch {}
                    try {
                        embed.addField(`10. ${results[9].businessName}`, `${emoji.currency} $${results[9].businessBalance.toLocaleString('en-US')}`)
                    } catch {}
                    return interaction.reply({
                        embeds: [embed]
                    })
                });
            }

            if (interaction.options.getSubcommand() === 'age') {
                con.query(`SELECT businessCreated, businessName FROM business ORDER BY businessCreated ASC LIMIT 10;`, function (error, results, fields) {
                    if (error) throw error;
                    let embed = new MessageEmbed()
                    embed.setTitle(`PizzaParadise Age Leaderboard`)
                    embed.setThumbnail(ee.footericon)
                    embed.setColor(ee.color)

                    try {
                        const remake = Date.now() - results[0].businessCreated;
                        const remade = remake / 86400000;
                        const remadefinal = Math.floor(remade);
                        embed.addField(`1. ${results[0].businessName}`, `⏳ ${remadefinal} days`)
                    } catch {}
                    try {
                        const remake1 = Date.now() - results[1].businessCreated;
                        const remade1 = remake1 / 86400000;
                        const remadefinal1 = Math.floor(remade1);
                        embed.addField(`2. ${results[1].businessName}`, `⏳ ${remadefinal1} days`)
                    } catch {}
                    try {
                        const remake2 = Date.now() - results[2].businessCreated;
                        const remade2 = remake2 / 86400000;
                        const remadefinal2 = Math.floor(remade2);
                        embed.addField(`3. ${results[2].businessName}`, `⏳ ${remadefinal2} days`)
                    } catch {}
                    try {
                        const remake3 = Date.now() - results[3].businessCreated;
                        const remade3 = remake3 / 86400000;
                        const remadefinal3 = Math.floor(remade3);
                        embed.addField(`4. ${results[3].businessName}`, `⏳ ${remadefinal3} days`)
                    } catch {}
                    try {
                        const remake4 = Date.now() - results[4].businessCreated;
                        const remade4 = remake4 / 86400000;
                        const remadefinal4 = Math.floor(remade4);
                        embed.addField(`5. ${results[4].businessName}`, `⏳ ${remadefinal4} days`)
                    } catch {}
                    try {
                        const remake5 = Date.now() - results[5].businessCreated;
                        const remade5 = remake5 / 86400000;
                        const remadefinal5 = Math.floor(remade5);
                        embed.addField(`6. ${results[5].businessName}`, `⏳ ${remadefinal5} days`)
                    } catch {}
                    try {
                        const remake6 = Date.now() - results[6].businessCreated;
                        const remade6 = remake6 / 86400000;
                        const remadefinal6 = Math.floor(remade6);
                        embed.addField(`7. ${results[6].businessName}`, `⏳ ${remadefinal6} days`)
                    } catch {}
                    try {
                        const remake7 = Date.now() - results[7].businessCreated;
                        const remade7 = remake7 / 86400000;
                        const remadefinal7 = Math.floor(remade7);
                        embed.addField(`8. ${results[7].businessName}`, `⏳ ${remadefinal7} days`)
                    } catch {}
                    try {
                        const remake8 = Date.now() - results[8].businessCreated;
                        const remade8 = remake8 / 86400000;
                        const remadefinal8 = Math.floor(remade8);
                        embed.addField(`9. ${results[8].businessName}`, `⏳ ${remadefinal8} days`)
                    } catch {}
                    try {
                        const remake9 = Date.now() - results[9].businessCreated;
                        const remade9 = remake9 / 86400000;
                        const remadefinal9 = Math.floor(remade9);
                        embed.addField(`10. ${results[9].businessName}`, `⏳ ${remadefinal9} days`)
                    } catch {}
                    return interaction.reply({
                        embeds: [embed]
                    })
                });
            }
        }
    }

    /*

    Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
    Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
    Other than that, please do note that it is required if you are using this to mention the original developer
    Original Developer - PGamingHD#0666
    
    */