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
    name: 'donate',
    description: 'Need information about how you can donate to support this project? Use this command!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, interaction, args) => {
        return interaction.reply({
            embeds: [
                new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`Donate to the PizzaParadise Developer?`)
                .setDescription(`Contribute to our awesome Development Team, help support the bot so that we can continue baking pizzas for everyone!\n\nCheck out the **perks** you get from donating on the packages, I can promise you that you will not regret it.\n\nMake sure to also join our Support Server to claim your rewards.\n\n__**Support Server:**__ https://discord.gg/pxySje4GPC\n__**Donation Link:**__ https://sellix.io/PGamingHD`)
                .setFooter(`Do not hesitate to ask our Support Team if you need help with donating!`)
                .setThumbnail(ee.footericon)
            ],
            ephemeral: true
        })
    }
}

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/