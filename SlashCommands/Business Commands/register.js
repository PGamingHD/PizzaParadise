    const {
        Client,
        CommandInteraction,
        MessageEmbed,
        MessageActionRow,
        MessageButton
    } = require('discord.js');
    const ee = require('../../botconfig/embed.json');
    const emoji = require('../../botconfig/emojis.json')
    const prettyMilliseconds = require('pretty-ms');
    const config = require('../../botconfig/config.json')

    module.exports = {
        name: 'register',
        description: 'Register to the bot if you are new, welcome!',
        /** 
         * @param {Client} client 
         * @param {Message} message 
         * @param {String[]} args 
         */
        run: async (client, interaction, args, con) => {
            let mainquery = con.query(`SELECT * FROM business WHERE userId = '${interaction.user.id}' LIMIT 1;`, function (err, rows) {
                if (err) throw err;
                if (rows && rows.length) {
                    return interaction.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.wrongcolor)
                            .setDescription(`${emoji.error} You already own a business.`)
                        ]
                    })
                } else {
                    con.query(`
                                    INSERT INTO business (userId, businessName, businessCreated, tableAccess) VALUES ('${interaction.user.id}', '${interaction.user.username}', '${Date.now()}', '${interaction.user.id}');
                                    INSERT INTO userprofile (userId, tableAccess) VALUES ('${interaction.user.id}', '${interaction.user.id}');
                                    INSERT INTO pizzacheesestock (userId, tableAccess) VALUES ('${interaction.user.id}', '${interaction.user.id}');
                                    INSERT INTO pizzasaucestock (userId, tableAccess) VALUES ('${interaction.user.id}', '${interaction.user.id}');
                                    INSERT INTO pizzadoughstock (userId, tableAccess) VALUES ('${interaction.user.id}', '${interaction.user.id}');
                                    INSERT INTO pizzahamstock (userId, tableAccess) VALUES ('${interaction.user.id}', '${interaction.user.id}');
                                    INSERT INTO pizzasausagestock (userId, tableAccess) VALUES ('${interaction.user.id}', '${interaction.user.id}');
                                    INSERT INTO premiumuser (userId, tableAccess) VALUES ('${interaction.user.id}', '${interaction.user.id}');
                                    INSERT INTO cmdcooldowns (userId, tableAccess) VALUES ('${interaction.user.id}', '${interaction.user.id}');
                                    INSERT INTO ownedrecipes (userId) VALUES (${interaction.user.id});
                                    INSERT INTO userinventory (userId) VALUES (${interaction.user.id});
                                    INSERT INTO cryptowallet (userId) VALUES (${interaction.user.id});
                                    `)
                    //INSERT INTO upgrade (userId) VALUES (${message.author.id});

                    //con.query(`INSERT INTO pizzacheesestock (userId) VALUES (${message.author.id})`)
                    //con.query(`INSERT INTO pizzasaucestock (userId) VALUES (${message.author.id})`)
                    //con.query(`INSERT INTO pizzadoughstock (userId) VALUES (${message.author.id})`)
                    //con.query(`INSERT INTO pizzahamstock (userId) VALUES (${message.author.id})`)
                    //con.query(`INSERT INTO pizzasausagestock (userId) VALUES (${message.author.id})`)
                    //con.query(`INSERT INTO topggvoted (userId) VALUES (${message.author.id})`)
                    //con.query(`INSERT INTO upgradeappliances (userId) VALUES (${message.author.id})`)
                    //con.query(`INSERT INTO upgradebathrooms (userId) VALUES (${message.author.id})`)
                    //con.query(`INSERT INTO upgradebillboard (userId) VALUES (${message.author.id})`)
                    //con.query(`INSERT INTO upgradefurniture (userId) VALUES (${message.author.id})`)
                    //con.query(`INSERT INTO upgrade (userId) VALUES (${message.author.id})`)

                    interaction.reply({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`${emoji.success} **Your Pizza Business was created!** Check your DMs for more info!\n\n📚 Run \`/tutorial\` to learn the basics of PizzaParadise.`)
                        ]
                    })
                    interaction.user.send({
                        embeds: [
                            new MessageEmbed()
                            .setColor(ee.color)
                            .setTitle(`🍕 __Your brand new Business is now up and running!__ 🍕`)
                            .setDescription(`🔹 You are the newest opened Pizza Resturant, make sure to take this to the top!\n🔹 You can increase your payment by baking, selling and buying better recipes! You cannot bake pizzas without the recipe for them.\n🔹 Make sure to also check out the Crypto Market to purchase crypto currency with the \`/market\` command!\n\n🔸 Become the most successful Pizza Business owner and reach the **top of the leaderboards**!\n🔸 Maybe you're interested more in crypto collection? Become the best and largest crypto collector and rule Discord with your arsenal!\n\n⚡ Below this is a link to the **Support Server**! By joining this you gain the following perks:\n- Get help with bot issues asap and get update about new updates!\n- Become a member of the awesome PizzaParadise community, make friends and so much more!\n- Participate in our very awesome **Giveaways** hosted by our Staff Team!\n- Be apart of the bot, **Suggest** new features to the developer!\n\n**Need further help? Use our \`/tutorial\` command!**`)
                        ],
                    })
                    setTimeout(() => {
                        return interaction.user.send({
                            content: 'https://discord.gg/pxySje4GPC'
                        })
                    }, 1000);
                }
            })
        }
    }

    /*

    Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
    Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
    Other than that, please do note that it is required if you are using this to mention the original developer
    Original Developer - PGamingHD#0666
    
    */