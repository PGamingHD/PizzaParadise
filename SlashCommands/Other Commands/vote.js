const {
    Client,
    CommandInteraction,
    MessageEmbed
} = require('discord.js');
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");

module.exports = {
    name: 'vote',
    description: 'Get the vote link for the PizzaParadise bot!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args, prefix) => {
        let embed = new MessageEmbed()
            .setColor(ee.color)
            .setDescription(`${emoji.currency} Vote for PizzaParadise and recieve **__$100,000__**! ${emoji.currency}\n\nUse \`/claim\` after you vote!\n\nhttps://top.gg/bot/904757023797813339/vote`)
            .setFooter(interaction.user.tag)
        interaction.reply({
            embeds: [embed]
        })
    }
}

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/