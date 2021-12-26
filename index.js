//           --------------------<CONSTRUCTORS>--------------------

const {
    Client,
    Collection,
    Intents,
    WebhookClient
} = require("discord.js");
const {
    readdirSync
} = require("fs");
const {
    AutoPoster
} = require('topgg-autoposter');
const Topgg = require("@top-gg/sdk");
const express = require("express");
const mysql = require('mysql2');
const config = require("./botconfig/config.json");
const schedule = require("node-schedule");
const Statcord = require("statcord.js");

//           --------------------<CONSTRUCTORS>--------------------


//           --------------------<CONSTRUCTING CLIENT>--------------------
const client = new Client({
    allowedMentions: {
        parse: ["users"], // "everyone", "roles", "users"
        repliedUser: false,
    },

    intents: [
        Intents.FLAGS.GUILDS,
        //Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        //Intents.FLAGS.GUILD_BANS,
        //Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        //Intents.FLAGS.GUILD_INTEGRATIONS,
        //Intents.FLAGS.GUILD_WEBHOOKS,
        //Intents.FLAGS.GUILD_INVITES,
        //Intents.FLAGS.GUILD_PRESENCES,
        //Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        //Intents.FLAGS.GUILD_MESSAGE_TYPING,
        //Intents.FLAGS.DIRECT_MESSAGES,
        //Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        //Intents.FLAGS.DIRECT_MESSAGE_TYPING
    ],
});
//           --------------------<CONSTRUCTING CLIENT>--------------------


//           --------------------<MODULE EXPORTS>--------------------

module.exports = client;

//           --------------------<MODULE EXPORTS>--------------------


//           --------------------<GLOBAL VARIABLES CONSTRUCTION>--------------------
client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldowns = new Collection();
client.categories = readdirSync("./commands/");
client.config = require("./botconfig/config.json");
//           --------------------<GLOBAL VARIABLES CONSTRUCTION>--------------------


//           --------------------<REQUIRES>--------------------
require("./handler/anticrash")(client)
// Initializing the project
require("./handler")(client);
//require("./database/db")
//           --------------------<REQUIRES>--------------------


//           --------------------<POST TOP.GG STATS EVERY HOUR!>--------------------

/* REMOVE THESE IF YOU WISH TO POST STATS TO TOP.GG! (AND INCLUDE API KEY WHERE IT SAYS TO ADD IT!)
const job = schedule.scheduleJob('00 00 * * *', async () => {
    const ap = AutoPoster('Top.GG API KEY HERE', client)

    await ap.on('posted', () => {
        console.log('Posted daily stats to Top.gg!')
    })
});
*/

//           --------------------<POST TOP.GG STATS EVERY HOUR!>--------------------


//           --------------------<ESTABLISHING MYSQL CONNECTION>--------------------

const con = mysql.createConnection({
    host: config.Database.DB_HOST,
    user: config.Database.DB_USER,
    password: config.Database.DB_PASS,
    database: config.Database.DB_DATABASE,
    multipleStatements: true,
    supportBigNumbers: true,
});

con.connect(err => {
    if (err) throw err;
    console.log("Successfully connected to the MySQL Database!")
    //con.query("SHOW TABLES", console.log)
});

client.connection = con;

//           --------------------<MYSQL CONNECTION ESTABLISHED>--------------------


//           --------------------<STARTER>--------------------

client.login(client.config.token);

//           --------------------<STARTER>--------------------

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/