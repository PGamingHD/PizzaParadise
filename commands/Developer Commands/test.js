const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const emoji = require("../../botconfig/emojis.json");
const ee = require("../../botconfig/embed.json");
const config = require("../../botconfig/config.json");
const prettyMilliseconds = require("pretty-ms");
const {
    evaluate
} = require("mathjs");

module.exports = {
    name: "test", //userMoney, userBank, userBitcoin, userID (ALL USERVALUES)
    aliases: ['tests', 'testing'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args, con) => {
        if (!config.ownerID.includes(message.author.id)) return;

        /* PERCENTAGED BAR TO DISPLAY IN CHANNEL!
        //const result = Math.round((5 / 10) * 100) GET PERCENTAGE FROM 2 NUM!
        const value = 69; //VALUE!
        const maxValue = 100; //MAX VALUE, WHAT IS TO BE 100%!
        const size = 20; // SIZE OF BAR ITSELF!
        const percentage = value / maxValue; // Calculate the percentage of the bar
        const progress = Math.round((size * percentage)); // Calculate the number of square caracters to fill the progress side.
        const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.

        const progressText = '▰'.repeat(progress); // Repeat is creating a string with progress * caracters in it
        const emptyProgressText = '▱'.repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
        const percentageText = Math.round(percentage * 100) + '%'; // Displaying the percentage of the bar

        const bar = '' + progressText + emptyProgressText + ' '; // Creating the bar
        return message.channel.send({
            embeds: [new MessageEmbed()
                .setColor(ee.color)
                .setTitle(`TESTING BAR`)
                .addField(`Percentage`, `${percentageText}`)
                .addField(`Percentage Bar`, `${bar}`)
            ]
        });
        */

        /* REGEX CHECKER TO CHECK FOR SPECIAL CHARS, BREAKS DB IF NOT!
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if (format.test(args[0])) {
         return console.log("has!");
        } else {
         return console.log("has not!");
        }
        */
        /* COOLDOWN TEMPLATE, SET COOLDOWN TO 1d and display time left!
        con.query(`SELECT * FROM cmdcooldowns WHERE userId = '${message.author.id}';`, function (error, results, fields) {
            let cooldown = 86400000;
            if (Date.now() >= results[0].helpcooldown + cooldown || results[0].helpcooldown == 0) {

                const bonus = Math.floor(Math.random() * 5000) + 1;
                message.reply({
                    content: `${emoji.success} Your daily bonus came in, it contained a total of \`${bonus}\`${emoji.currency}!`
                })

                return con.query(`UPDATE cmdcooldowns SET helpcooldown = ${Date.now()} WHERE userId = '${message.author.id}'`);
            } else {
                let cooldown = 86400000;
                const timetobe = results[0].helpcooldown + cooldown;
                const timenow = Date.now();
                //console.log(timetobe - timenow)
                const timeleft = timetobe - timenow
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`You must wait **${prettyMilliseconds(timeleft)}** before claiming your daily reward again.`)
                    ]
                })
            }
        });
        */

        /* CHANGE CHANNEL NAME, LOOP THROUGH EVERY HOUR AT 00 AND SET NAME TO BUSINESS COUNT!
        con.query(`SELECT COUNT(*) FROM business;`, function (error, results, fields) {
            //return console.log(results[0]['COUNT(*)'])
            let channel = client.channels.cache.get(`890897341333274644`);
            channel.setName(`Business Count: ${results[0]['COUNT(*)']}`)
        });
        */

        /* YES!
        con.query(`SELECT * FROM business WHERE userId = '${message.author.id}' LIMIT 1;SELECT * FROM pizzasauce WHERE ingredientId = 'pizzasauce' LIMIT 1;`, function (err, rows) {
            if (err) throw err;

            var test = rows[1].amount;
            var test2 = rows[0].businessName;
            console.log(test2);
            console.log(test);
            message.reply({
                content: `First, ${test} | Secondly: ${test2}`
            })
        });
        */
        //con.query(`SELECT userId FROM business WHERE userId = '266726434855321600';`, businessQuery);
        //con.query(`SELECT votedforbot FROM topggvoted WHERE userId = '266726434855321600';`, votedQuery);

        //console.log(firstval)

        /*
        var val = con.promise().query(`SELECT userId FROM business WHERE userId = '266726434855321600'`).then(async rows => {
            console.log(rows[0][0].userId)
            //val = test;
        })
        */

        /*
        connection.query('SELECT 1; SELECT 2', function (error, results, fields) {
            if (error) throw error;
            // `results` is an array with one element for every statement in the query:
            console.log(results[0]); // [{1: 1}]
            console.log(results[1]); // [{2: 2}]
          });
          */

        //console.log(rows[0][0].userId);

        // VARIABLE ACCESSIBLE HERE

        /*
        var foo = function (err, rows) {
            con.query(`SELECT userId FROM business WHERE userId = '266726434855321600';`, function (err, rows) {
                value = rows[0].userId
            });

            let foo = new foo();
            console.log(foo.value);
        };

        foo();
        */

        //console.log(a.rows[0].userId); // is 10



        //let value = getData();

        /*
        function businessQuery(err, row1, fields) {
            console.log(row1);
        };

        function votedQuery(err, row, fields) {

            //console.log(first)
            businessQuery();
            console.log(row)
            // console.log(this.var1)
            // console.log(this.var2.businessQuery)
        };
        */

        /*function setValue(value1) {
            someVar = value1;
            //someOtherVar = value2;
            console.log(someVar[0].votedforbot)
            //console.log(someOtherVar[0])

            if (someVar[0].votedforbot == 0) {
                console.log("is 0!")
            } else {
                console.log("is NOT 0!")
            }
        }
        */

        // console.log(somevar.fields);
        // console.log("HEYA!")

        /* GET DB PING?!?
        const timeBefore = new Date().getTime();
        con.query(`SELECT 1`);
        const timeAfter = new Date().getTime();

        const evaled = evaluate(`${timeAfter} - ${timeBefore}`);
        console.log(`Database ping: ${evaled}ms`)
        */

        /* CHECK IF EXECUTION WAS TRUE OR FALSE, IF FALSE GO DOWN AND RETURN, IF TRUE SEND HI!
        let yes = con.query(`SELECT * FROM business WHERE userId = '6969' LIMIT 1;`, function (err, rows) {
            if (err) throw err;


            if (rows && rows.length) {
                return message.reply({
                    embeds: [new MessageEmbed()
                        .setColor(ee.color)
                        .setThumbnail(message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`Heya!`)
                        .addField(`Creation Date`, `:small_red_triangle: ${rows[0].businessBooster}`)
                    ]
                })
            } else {
                return message.reply({
                    content: 'No results in DB found for you, register first!'
                })
            }
        });
        */

        /*SELECT FROM DATABASE CELL!
        con.query(`SELECT businessCreated FROM business WHERE EXISTS (SELECT businessCreated FROM business WHERE userId = '${message.author.id}')`, function (err, rows) {
            if (err) throw err;

            message.reply({
                content: `<t:${rows[0].businessCreated}>`
            })
        });
        */

        /*
        // SQL Retrieve value and log it! Used for bal and so on!
        return con.query(`SELECT guildId FROM blacklists WHERE userId = '${message.author.id}'`, (err, rows) => {
            console.log(rows[0].guildId);
            message.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor(ee.color)
                    .setDescription(`You currently have £${rows[0].guildId}`)
                ]
            })
        });
        */

        /*
         client.connection.query(`select * from blacklists where userId = '${message.author.id}'`, (err, rows) => {
             if (err) throw err;
             if (rows.length >= 1 && !config.ownerID.includes(message.author.id)) { //&& !config.ownerID.includes.message.author.id
                 const buttonrow = new MessageActionRow().addComponents(
                     new MessageButton()
                     .setURL(config.supporturl)
                     .setStyle("LINK")
                     .setLabel("Support Server")
                 );
                 return message.reply({
                     embeds: [
                         new MessageEmbed()
                         .setColor(ee.color)
                         .setTitle(`${emoji.error} Blacklisted ${emoji.error}`)
                         .setFooter(ee.footertext, ee.footericon)
                         .setDescription(
                             `**Looks like you were Blacklisted from this bot!**\n\nDo you feel like this is a mistake? Please contact our Support team.\nYou may find our Support Server by clicking the button \`below\` and\nWe shall help you resolve this as soon as possible, please DM ModMail upon joining to get further assistance with this.`
                         ),
                     ],
                     components: [buttonrow],
                 });
             } else {
                 client.connection.query(`select * from blacklists where guildId = '${message.guild.id}'`, (err, rows) => {
                     if (err) throw err;
                     if (rows.length >= 1) { //&& !config.ownerID.includes.message.author.id
                         const buttonrow = new MessageActionRow().addComponents(
                             new MessageButton()
                             .setURL(config.supporturl)
                             .setStyle("LINK")
                             .setLabel("Support Server")
                         );
                         return message.reply({
                             embeds: [
                                 new MessageEmbed()
                                 .setColor(ee.color)
                                 .setTitle(`${emoji.error} Blacklisted ${emoji.error}`)
                                 .setFooter(ee.footertext, ee.footericon)
                                 .setDescription(
                                     `**Looks like this guild has been blacklisted from using this bot!**\n\nDo you feel like this is a mistake? Please contact our Support team.\nYou may find our Support Server by clicking the button \`below\` and\nWe shall help you resolve this as soon as possible, please DM ModMail upon joining to get further assistance with this.`
                                 )
                             ],
                             components: [buttonrow],
                         });
                     }else {
                         await command.run(client, message, args, con);
                     }
                 });
             }
         });
         */

        /*SQL INCREMENT VALUE WITH ANOTHER VALUE FROM SPECIFIC ROW BASED ON CELL USERID!
        client.connection.query(`UPDATE blacklists set guildId = guildId + 1 WHERE userId = '266726434855321600'`);
        */

        /*
        const valid = client.connection.query(`select * from blacklists where userId = '${message.author.id}'`, (err, rows) => {
            if (err) throw err;

            if (rows.length < 1) {
                //MySQL INSERT VALUE INTO TABLE!
                client.connection.query(`INSERT INTO blacklists (userId) VALUES (${message.author.id})`);
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.color)
                        .setDescription(`Your data has been successfully inputted!`)
                    ]
                })
            } else {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`You already seem to have valid data inputted!`)
                    ]
                })
            }
        })
        */

        //client.connection.query("select * from blacklists", console.log)

        //CHECK IF DATA EXISTS! MySQL
        /*
        const valid = con.query(`select * from blacklists where userId = '${message.author.id}'`, (err, rows) => {
            if (err) throw err;

            if (rows.length < 1) {
                console.log("No valid logs found for user!")
            } else {
                console.log("FOUND VALID LOGS!")
            }
        })
        */

        /* TEMPLATE PAYOUT COOLDOWN FOR EACH COMMAND PLEASE!
        con.query(`SELECT * FROM payoutcooldown;`, async function (error, results, fields) {
            if (results[0].payoutcooldown == 1) {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setColor(ee.wrongcolor)
                        .setDescription(`${emoji.error} Hourly incomes are currently being sent out, please wait around **15 seconds** before running commands again. Sorry for the inconvenience!`)
                    ]
                })
            } else {
                
            }
        });
        */

        return message.reply({
            embeds: [new MessageEmbed().setColor(ee.color).setDescription(`This is a testing command, executed code above successfully.`)]
        })
    },
};

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/