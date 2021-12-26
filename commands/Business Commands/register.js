const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json");
const ee = require("../../botconfig/embed.json");
const {
    evaluate
} = require("mathjs");



module.exports = {
    name: "register",
    aliases: ['start', 'begin'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con, prefix) => {
        let mainquery = con.query(`SELECT * FROM business WHERE userId = '${message.author.id}' LIMIT 1;`, function (err, rows) {
            if (err) throw err;
            if (rows && rows.length) {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`You already own a business.`)
                    ]
                })
            } else {
                con.query(`
                                INSERT INTO business (userId, businessName, businessCreated, tableAccess) VALUES ('${message.author.id}', '${message.author.username}', '${Date.now()}', '${message.author.id}');
                                INSERT INTO userprofile (userId, tableAccess) VALUES ('${message.author.id}', '${message.author.id}');
                                INSERT INTO pizzacheesestock (userId, tableAccess) VALUES ('${message.author.id}', '${message.author.id}');
                                INSERT INTO pizzasaucestock (userId, tableAccess) VALUES ('${message.author.id}', '${message.author.id}');
                                INSERT INTO pizzadoughstock (userId, tableAccess) VALUES ('${message.author.id}', '${message.author.id}');
                                INSERT INTO pizzahamstock (userId, tableAccess) VALUES ('${message.author.id}', '${message.author.id}');
                                INSERT INTO pizzasausagestock (userId, tableAccess) VALUES ('${message.author.id}', '${message.author.id}');
                                INSERT INTO premiumuser (userId, tableAccess) VALUES ('${message.author.id}', '${message.author.id}');
                                INSERT INTO cmdcooldowns (userId, tableAccess) VALUES ('${message.author.id}', '${message.author.id}');
                                INSERT INTO ownedrecipes (userId) VALUES (${message.author.id});
                                INSERT INTO userinventory (userId) VALUES (${message.author.id});
                                INSERT INTO cryptowallet (userId) VALUES (${message.author.id});
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

                message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`${emoji.success} **Your Pizza Business was created!** Check your DMs for more info!
        
                                📚 Run \`${prefix}tutorial\` to learn the basics of PizzaParadise.`)
                    ]
                })
                message.author.send({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setTitle(`🍕 __Your brand new Business is now up and running!__ 🍕`)
                        .setDescription(`
                                🔹 You are the newest opened Pizza Resturant, make sure to take this to the top!
                                🔹 You can increase your payment by baking, selling and buying better recipes! You cannot bake pizzas without the recipe for them.
                                🔹 Make sure to also check out the Crypto Market to purchase crypto currency with the \`${prefix}cm\` command!
        
                                🔸 Become the most successful Pizza Business owner and reach the **top of the leaderboards**!
                                🔸 Maybe you're interested more in crypto collection? Become the best and largest crypto collector and rule Discord with your arsenal!
        
                                ⚡ Below this is a link to the **Support Server**! By joining this you gain the following perks:
                                - Get help with bot issues asap and get update about new updates!
                                - Become a member of the awesome PizzaParadise community, make friends and so much more!
                                - Participate in our very awesome **Giveaways** hosted by our Staff Team!
                                - Be apart of the bot, **Suggest** new features to the developer!
        
                                **Need further help? Use our \`${prefix}tutorial\` command!**
                                `)
                    ],
                })
                setTimeout(() => {
                    return message.author.send({
                        content: 'https://discord.gg/pxySje4GPC'
                    })
                }, 1000);
            }
        })
    }
};

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/