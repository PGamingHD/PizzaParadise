const {
    Message,
    Client,
    MessageEmbed
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json")
const ee = require("../../botconfig/embed.json");

module.exports = {
    name: "soldlb", //Bank withdraw/deposit to withdraw money or deposit money into wallet
    aliases: ['slb', 'soldleaderboard', 'soldtop'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con) => {
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
            return message.reply({
                embeds: [embed]
            })
        });
    },
};

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/