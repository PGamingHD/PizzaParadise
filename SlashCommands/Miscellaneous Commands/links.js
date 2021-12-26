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
    name: 'links',
    description: 'Display all important bot links to use!',
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
                .setTitle(`:link: Important Links`)
                .setDescription(`Servers:\n[Support Server](https://discord.gg/pxySje4GPC)\n\nDonate:\n**Coming soon!**\n\nOther:\n[Invite the Bot](https://discord.com/api/oauth2/authorize?client_id=904757023797813339&permissions=517543939136&scope=bot%20applications.commands)\n[Vote for the Bot](https://top.gg/bot/904757023797813339)\n[Bot Status](https://pizzashack.freshstatus.io)
                `)
            ]
        })
    }
}

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/