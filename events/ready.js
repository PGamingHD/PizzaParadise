const client = require("../index");
const {
    change_status
} = require("../handler/functions");
const {
    evaluate,
    random
} = require("mathjs");
const config = require("../botconfig/config.json");
const emoji = require("../botconfig/emojis.json");
const schedule = require("node-schedule");
const prettyMilliseconds = require("pretty-ms")

client.on("ready", async (client) => {

    //#region updateBackend

    const job = schedule.scheduleJob('00 * * * *', async () => {
        client.connection.query(`SELECT COUNT(*) FROM business;`, function (error, results, fields) {
            //return console.log(results[0]['COUNT(*)'])
            //let channel = client.channels.cache.get(`910993835394486335`);
            let businesses = client.channels.cache.get(`912314462969688093`);
            //channel.setName(`Business count: ${results[0]['COUNT(*)'].toLocaleString('en-US')}!`)
            businesses.setName(`Businesses: ${results[0]['COUNT(*)'].toLocaleString('en-US')}`)
        });
        //SERVERS
        let totalservers = client.guilds.cache.size;
        let servers = client.channels.cache.get(`912314344308609075`);
        servers.setName(`Servers: ${totalservers.toLocaleString('en-US')}`)
        //USERS
        let totalusers = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
        let users = client.channels.cache.get(`912311755579985950`)
        users.setName(`Users: ${totalusers.toLocaleString('en-US')}`)
        //UPTIME
        let totaluptime = prettyMilliseconds(client.uptime);
        let uptime = client.channels.cache.get(`912314776858804244`)
        uptime.setName(`Uptime: ${totaluptime}`)
        //COMMANDS 
        let totalcmds = client.commands.size - 9;
        let cmds = client.channels.cache.get(`912314307881099334`)
        cmds.setName(`Commands: ${totalcmds}`)

        client.connection.query(`SELECT * FROM totalcommands;`, function (error, results, fields) {
            let commands = client.channels.cache.get(`912338079778472026`);
            commands.setName(`Cmds: ${results[0].totalCommands.toLocaleString('en-US')}`)
        });
    })

    //#endregion updatetotalshacks

    //#region stockmarket

    //let val = 0;
    const job2 = schedule.scheduleJob('00 * * * *', async () => {
        client.connection.query(`SELECT * FROM cryptobitcoin LEFT JOIN cryptoethereum ON cryptobitcoin.tableAccess = cryptoethereum.tableAccess LEFT JOIN cryptolitecoin ON cryptolitecoin.tableAccess = cryptobitcoin.tableAccess;`, async function (error, results, fields) {
            //               ----------------<Constructing interval for BITCOIN!>----------------

            const randomSauce = Math.random() * 2;
            const changed = Math.random() * 5 + 1;
            const changedfloor = Math.floor(changed);
            if (randomSauce > 1) {

                const oldcost = results[0].btcshareCost;

                client.connection.query(`UPDATE cryptobitcoin SET btcoldCost = ${oldcost}; UPDATE cryptobitcoin SET btcshareCost = ${oldcost} + ${changedfloor};
                UPDATE cryptobitcoin SET btctotalShares = 0;`)

                if (results[0].btcshareCost < 1000) {

                    const oldprice = results[0].btcshareCost;

                    client.connection.query(`UPDATE cryptobitcoin SET btcoldCost = ${oldcost}; UPDATE cryptobitcoin SET btcshareCost = ${oldprice} + 5;
                    UPDATE cryptobitcoin SET btctotalShares = 0;`)
                } else if (results[0].btcshareCost > 100000) {

                    const oldprice = results[0].btcshareCost;

                    client.connection.query(`UPDATE cryptobitcoin SET btcoldCost = ${oldcost}; UPDATE cryptobitcoin SET btcshareCost = ${oldprice} - 5;
                    UPDATE cryptobitcoin SET btctotalShares = 0;`)
                }
                //findUpgrades.upgradeTVad[0].level === 4
            } else {

                const oldcost = results[0].btcshareCost;

                client.connection.query(`UPDATE cryptobitcoin SET btcoldCost = ${oldcost}; UPDATE cryptobitcoin SET btcshareCost = ${oldcost} - ${changedfloor};
                UPDATE cryptobitcoin SET btctotalShares = 0;`)
                if (results[0].btcshareCost < 1000) {

                    const oldprice = results[0].btcshareCost;

                    client.connection.query(`UPDATE cryptobitcoin SET btcoldCost = ${oldcost}; UPDATE cryptobitcoin SET btcshareCost = ${oldprice} + 5;
                    UPDATE cryptobitcoin SET btctotalShares = 0;`)
                } else if (results[0].btcshareCost > 100000) {

                    const oldprice = results[0].btcshareCost;

                    client.connection.query(`UPDATE cryptobitcoin SET btcoldCost = ${oldcost}; UPDATE cryptobitcoin SET btcshareCost = ${oldprice} - 5;
                    UPDATE cryptobitcoin SET btctotalShares = 0;`)
                }
            }

            //               ----------------<Constructing interval for ETHEREUM!>----------------

            const randomCheese = Math.random() * 2;
            const changed2 = Math.random() * 5 + 1;
            const changedfloorcheese = Math.floor(changed2);
            if (randomCheese > 1) {

                const oldcost = results[0].ethshareCost;

                client.connection.query(`UPDATE cryptoethereum SET etholdCost = ${oldcost}; UPDATE cryptoethereum SET ethshareCost = ${oldcost} + ${changedfloorcheese};
                UPDATE cryptoethereum SET ethtotalShares = 0;`)

                if (results[0].ethshareCost < 25) {

                    const oldprice = results[0].ethshareCost;

                    client.connection.query(`UPDATE cryptoethereum SET etholdCost = ${oldcost}; UPDATE cryptoethereum SET ethshareCost = ${oldprice} + 5;
                    UPDATE cryptoethereum SET ethtotalShares = 0;`)
                } else if (results[0].ethshareCost > 50000) {

                    const oldprice = results[0].ethshareCost;

                    client.connection.query(`UPDATE cryptoethereum SET etholdCost = ${oldcost}; UPDATE cryptoethereum SET ethshareCost = ${oldprice} - 5;
                    UPDATE cryptoethereum SET ethtotalShares = 0;`)
                }
                //findUpgrades.upgradeTVad[0].level === 4
            } else {

                const oldcost = results[0].ethshareCost;

                client.connection.query(`UPDATE cryptoethereum SET etholdCost = ${oldcost}; UPDATE cryptoethereum SET ethshareCost = ${oldcost} - ${changedfloorcheese};
                UPDATE cryptoethereum SET ethtotalShares = 0;`)
                if (results[0].ethshareCost < 25) {

                    const oldprice = results[0].ethshareCost;

                    client.connection.query(`UPDATE cryptoethereum SET etholdCost = ${oldcost}; UPDATE cryptoethereum SET ethshareCost = ${oldprice} + 5;
                    UPDATE cryptoethereum SET ethtotalShares = 0;`)
                } else if (results[0].ethshareCost > 50000) {

                    const oldprice = results[0].ethshareCost;

                    client.connection.query(`UPDATE cryptoethereum SET etholdCost = ${oldcost}; UPDATE cryptoethereum SET ethshareCost = ${oldprice} - 5;
                    UPDATE cryptoethereum SET ethtotalShares = 0;`)
                }
            }

            //               ----------------<Constructing interval for LITECOIN!>----------------

            const randomDough = Math.random() * 2;
            const changed3 = Math.random() * 5 + 1;
            const changedfloordough = Math.floor(changed3);
            if (randomDough > 1) {

                const oldcost = results[0].ltcshareCost;

                client.connection.query(`UPDATE cryptolitecoin SET ltcoldCost = ${oldcost}; UPDATE cryptolitecoin SET ltcshareCost = ${oldcost} + ${changedfloordough};
                UPDATE cryptolitecoin SET ltctotalShares = 0;`)

                if (results[0].ltcshareCost < 10) {

                    const oldprice = results[0].ltcshareCost;

                    client.connection.query(`UPDATE cryptolitecoin SET ltcoldCost = ${oldcost}; UPDATE cryptolitecoin SET ltcshareCost = ${oldprice} + 5;
                    UPDATE cryptolitecoin SET ltctotalShares = 0;`)
                } else if (results[0].ltcshareCost > 25000) {

                    const oldprice = results[0].ltcshareCost;

                    client.connection.query(`UPDATE cryptolitecoin SET ltcoldCost = ${oldcost}; UPDATE cryptolitecoin SET ltcshareCost = ${oldprice} - 5;
                    UPDATE cryptolitecoin SET ltctotalShares = 0;`)
                }
                //findUpgrades.upgradeTVad[0].level === 4
            } else {

                const oldcost = results[0].ltcshareCost;

                client.connection.query(`UPDATE cryptolitecoin SET ltcoldCost = ${oldcost}; UPDATE cryptolitecoin SET ltcshareCost = ${oldcost} - ${changedfloordough};
                UPDATE cryptolitecoin SET ltctotalShares = 0;`)
                if (results[0].ltcshareCost < 10) {

                    const oldprice = results[0].ltcshareCost;

                    client.connection.query(`UPDATE cryptolitecoin SET ltcoldCost = ${oldcost}; UPDATE cryptolitecoin SET ltcshareCost = ${oldprice} + 5;
                    UPDATE cryptolitecoin SET ltctotalShares = 0;`)
                } else if (results[0].ltcshareCost > 25000) {

                    const oldprice = results[0].ltcshareCost;

                    client.connection.query(`UPDATE cryptolitecoin SET ltcoldCost = ${oldcost}; UPDATE cryptolitecoin SET ltcshareCost = ${oldprice} - 5;
                    UPDATE cryptolitecoin SET ltctotalShares = 0;`)
                }
            }
            //val++;
            //valcheck();
        });
    });

    //#endregion stockmarket

    //#region refills

    const job3 = schedule.scheduleJob('00 * * * *', async () => {
        let randomnum = Math.floor(Math.random() * 10000 + 1) + 1;

        client.connection.query(`UPDATE ingredientstock SET cheesestock = 1000000000;
        UPDATE ingredientstock SET saucestock = 1000000000;
        UPDATE ingredientstock SET yeaststock = 1000000000;
        UPDATE ingredientstock SET saltstock = 1000000000;
        UPDATE ingredientstock SET sugarstock = 1000000000;
        UPDATE ingredientstock SET flourstock = 1000000000;`)

        if (randomnum < 6500) {
            client.connection.query(`UPDATE ingredientstock SET hamstock = hamstock + 750;`)
        }
        if (randomnum < 4500) {
            client.connection.query(`UPDATE ingredientstock SET pepperstock = pepperstock + 1000;`)
        }
        if (randomnum < 3500) {
            client.connection.query(`UPDATE ingredientstock SET pineapplestock = pineapplestock + 1500;`)
        }
        if (randomnum < 2500) {
            client.connection.query(`UPDATE ingredientstock SET garlicstock = garlicstock + 1750;`)
        }
        if (randomnum < 1500) {
            client.connection.query(`UPDATE ingredientstock SET pepperonistock = pepperonistock + 2000;`)
        }
        if (randomnum < 1000) {
            client.connection.query(`UPDATE ingredientstock SET baconstock = baconstock + 3500;`)
        }
        if (randomnum < 750) {
            client.connection.query(`UPDATE ingredientstock SET chickenstock = chickenstock + 5000;`)
        }
    });

    //#endregion refills

    //#region stocktemplate

    /*CONSTRUCTOR TEMPLATE!
                //               ----------------<Constructing interval for LITECOIN!>----------------

            const randomDough = Math.random() * 2;
            const changed3 = Math.random() * 5 + 1;
            const changedfloordough = Math.floor(changed3);
            if (randomDough > 1) {

                const oldcost = results[0].doughshareCost;

                client.connection.query(`UPDATE pizzadough SET dougholdCost = ${oldcost}; UPDATE pizzadough SET doughshareCost = ${oldcost} + ${changedfloordough};`)

                if (results[0].doughshareCost < 9) {

                    const oldprice = results[0].doughshareCost;

                    client.connection.query(`UPDATE pizzadough SET dougholdCost = ${oldcost}; UPDATE pizzadough SET doughshareCost = ${oldprice} + 5;`)
                } else if (results[0].doughshareCost > 250) {

                    const oldprice = results[0].doughshareCost;

                    client.connection.query(`UPDATE pizzadough SET dougholdCost = ${oldcost}; UPDATE pizzadough SET doughshareCost = ${oldprice} - 5;`)
                }
                //findUpgrades.upgradeTVad[0].level === 4
            } else {

                const oldcost = results[0].doughshareCost;

                client.connection.query(`UPDATE pizzadough SET dougholdCost = ${oldcost}; UPDATE pizzadough SET doughshareCost = ${oldcost} - ${changedfloordough};`)
                if (results[0].doughshareCost < 9) {

                    const oldprice = results[0].doughshareCost;

                    client.connection.query(`UPDATE pizzadough SET dougholdCost = ${oldcost}; UPDATE pizzadough SET doughshareCost = ${oldprice} + 5;`)
                } else if (results[0].doughshareCost > 250) {

                    const oldprice = results[0].doughshareCost;

                    client.connection.query(`UPDATE pizzadough SET dougholdCost = ${oldcost}; UPDATE pizzadough SET doughshareCost = ${oldprice} - 5;`)
                }
            }
    */

    //#endregion stocktemplate

    //#region oldschedulers

    /* 
    setInterval(async () => {

        const findBusiness = await Business.find({
            __v: 0,
        })

        findBusiness.forEach(element => {

            element.businessBalance += element.businessIncome,
                element.save()
        })

    }, 1000 * 1000 * 3.6 * 1);
    */

    /* OLD SCHEDULING!
    let val = 0;
    let marketinterval = setInterval(async () => {

        //               ----------------<Constructing interval for Sauce!>----------------

        const randomSauce = Math.random() * 2;
        const changed = Math.random() * 5 + 1;
        const changedfloor = Math.floor(changed);
        if (randomSauce > 1) {

            const findMarketone = await Market.findOne({
                __v: 0,
            })
            const oldcost = findMarketone.PizzaSauce[0].shareCost;

            const findMarket = await Market.findOneAndUpdate({
                __v: 0,
            }, {
                PizzaSauce: [{
                    shareCost: oldcost + changedfloor,
                    oldCost: oldcost,
                    totalShares: 0,
                    changed1h: 0,
                    changed6h: 0,
                    changed24h: 0,
                }]
            })
            if (findMarketone.PizzaSauce[0].shareCost < 7) {
                const oldprice = findMarketone.PizzaSauce[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaSauce: [{
                        shareCost: oldprice + 5,
                        oldCost: oldcost,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            } else if (findMarketone.PizzaSauce[0].shareCost > 250) {
                const oldprice = findMarketone.PizzaSauce[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaSauce: [{
                        shareCost: oldprice - 5,
                        oldCost: oldcost,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            }
            //findUpgrades.upgradeTVad[0].level === 4
            console.log(`SAUCE WENT UP: ${changedfloor}`)

        } else {
            const findMarketone = await Market.findOne({
                __v: 0,
            })
            const oldcost = findMarketone.PizzaSauce[0].shareCost;

            const findMarket = await Market.findOneAndUpdate({
                __v: 0,
            }, {
                PizzaSauce: [{
                    shareCost: oldcost - changedfloor,
                    oldCost: oldcost,
                    totalShares: 0,
                    changed1h: 0,
                    changed6h: 0,
                    changed24h: 0,
                }]
            })
            if (findMarketone.PizzaSauce[0].shareCost < 7) {
                const oldprice = findMarketone.PizzaSauce[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaSauce: [{
                        shareCost: oldprice + 5,
                        oldCost: oldcost,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            } else if (findMarketone.PizzaSauce[0].shareCost > 250) {
                const oldprice = findMarketone.PizzaSauce[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaSauce: [{
                        shareCost: oldprice - 5,
                        oldCost: oldcost,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            }
            console.log(`SAUCE WENT DOWN: ${changedfloor}`)
        }


        //               ----------------<Constructing interval for cheese!>----------------

        const randomCheese = Math.random() * 2;
        const changedCheese = Math.random() * 5 + 1;
        const changedfloorCheese = Math.floor(changedCheese);
        if (randomCheese > 1) {

            const findMarketone = await Market.findOne({
                __v: 0,
            })
            const oldcostCheese = findMarketone.PizzaCheese[0].shareCost;

            const findMarket = await Market.findOneAndUpdate({
                __v: 0,
            }, {
                PizzaCheese: [{
                    shareCost: oldcostCheese + changedfloorCheese,
                    oldCost: oldcostCheese,
                    totalShares: 0,
                    changed1h: 0,
                    changed6h: 0,
                    changed24h: 0,
                }]
            })
            if (findMarketone.PizzaCheese[0].shareCost < 5) {
                const oldprice = findMarketone.PizzaCheese[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaCheese: [{
                        shareCost: oldprice + 5,
                        oldCost: oldcostCheese,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            } else if (findMarketone.PizzaCheese[0].shareCost > 250) {
                const oldprice = findMarketone.PizzaCheese[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaCheese: [{
                        shareCost: oldprice - 5,
                        oldCost: oldcostCheese,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            }
            //findUpgrades.upgradeTVad[0].level === 4
            console.log(`CHEESE WENT UP: ${changedfloorCheese}`)
        } else {
            const findMarketone = await Market.findOne({
                __v: 0,
            })
            const oldcostCheese = findMarketone.PizzaCheese[0].shareCost;

            const findMarket = await Market.findOneAndUpdate({
                __v: 0,
            }, {
                PizzaCheese: [{
                    shareCost: oldcostCheese - changedfloorCheese,
                    oldCost: oldcostCheese,
                    totalShares: 0,
                    changed1h: 0,
                    changed6h: 0,
                    changed24h: 0,
                }]
            })
            if (findMarketone.PizzaCheese[0].shareCost < 5) {
                const oldprice = findMarketone.PizzaCheese[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaCheese: [{
                        shareCost: oldprice + 5,
                        oldCost: oldcostCheese,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            } else if (findMarketone.PizzaCheese[0].shareCost > 250) {
                const oldprice = findMarketone.PizzaCheese[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaCheese: [{
                        shareCost: oldprice - 5,
                        oldCost: oldcostCheese,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            }
            console.log(`CHEESE WENT DOWN: ${changedfloorCheese}`)
        }

        //               ----------------<Constructing interval for Dough!>----------------

        const randomDough = Math.random() * 2;
        const changedDough = Math.random() * 5 + 1;
        const changedfloorDough = Math.floor(changedDough);
        if (randomDough > 1) {

            const findMarketone = await Market.findOne({
                __v: 0,
            })
            const oldcostDough = findMarketone.PizzaDough[0].shareCost;

            const findMarket = await Market.findOneAndUpdate({
                __v: 0,
            }, {
                PizzaDough: [{
                    shareCost: oldcostDough + changedfloorDough,
                    oldCost: oldcostDough,
                    totalShares: 0,
                    changed1h: 0,
                    changed6h: 0,
                    changed24h: 0,
                }]
            })
            if (findMarketone.PizzaDough[0].shareCost < 9) {
                const oldprice = findMarketone.PizzaDough[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaDough: [{
                        shareCost: oldprice + 5,
                        oldCost: oldcostDough,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            } else if (findMarketone.PizzaDough[0].shareCost > 250) {
                const oldprice = findMarketone.PizzaDough[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaDough: [{
                        shareCost: oldprice - 5,
                        oldCost: oldcostDough,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            }
            //findUpgrades.upgradeTVad[0].level === 4
            console.log(`DOUGH WENT UP: ${changedfloorDough}`)
        } else {
            const findMarketone = await Market.findOne({
                __v: 0,
            })
            const oldcostDough = findMarketone.PizzaDough[0].shareCost;

            const findMarket = await Market.findOneAndUpdate({
                __v: 0,
            }, {
                PizzaDough: [{
                    shareCost: oldcostDough - changedfloorDough,
                    oldCost: oldcostDough,
                    totalShares: 0,
                    changed1h: 0,
                    changed6h: 0,
                    changed24h: 0,
                }]
            })
            if (findMarketone.PizzaDough[0].shareCost < 9) {
                const oldprice = findMarketone.PizzaDough[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaDough: [{
                        shareCost: oldprice + 5,
                        oldCost: oldcostDough,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            } else if (findMarketone.PizzaDough[0].shareCost > 250) {
                const oldprice = findMarketone.PizzaDough[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaDough: [{
                        shareCost: oldprice - 5,
                        oldCost: oldcostDough,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            }
            console.log(`DOUGH WENT DOWN: ${changedfloorDough}`)
        }

        //               ----------------<Constructing interval for Ham!>----------------

        const randomHam = Math.random() * 2;
        const changedHam = Math.random() * 5 + 1;
        const changedfloorHam = Math.floor(changedHam);
        if (randomDough > 1) {

            const findMarketone = await Market.findOne({
                __v: 0,
            })
            const oldcostHam = findMarketone.PizzaHam[0].shareCost;

            const findMarket = await Market.findOneAndUpdate({
                __v: 0,
            }, {
                PizzaHam: [{
                    shareCost: oldcostHam + changedfloorHam,
                    oldCost: oldcostHam,
                    totalShares: 0,
                    changed1h: 0,
                    changed6h: 0,
                    changed24h: 0,
                }]
            })
            if (findMarketone.PizzaHam[0].shareCost < 12) {
                const oldprice = findMarketone.PizzaHam[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaHam: [{
                        shareCost: oldprice + 5,
                        oldCost: oldcostHam,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            } else if (findMarketone.PizzaHam[0].shareCost > 250) {
                const oldprice = findMarketone.PizzaHam[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaHam: [{
                        shareCost: oldprice - 5,
                        oldCost: oldcostHam,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            }
            //findUpgrades.upgradeTVad[0].level === 4
            console.log(`HAM WENT UP: ${changedfloorHam}`)
        } else {
            const findMarketone = await Market.findOne({
                __v: 0,
            })
            const oldcostHam = findMarketone.PizzaHam[0].shareCost;

            const findMarket = await Market.findOneAndUpdate({
                __v: 0,
            }, {
                PizzaHam: [{
                    shareCost: oldcostHam - changedfloorHam,
                    oldCost: oldcostHam,
                    totalShares: 0,
                    changed1h: 0,
                    changed6h: 0,
                    changed24h: 0,
                }]
            })
            if (findMarketone.PizzaHam[0].shareCost < 12) {
                const oldprice = findMarketone.PizzaHam[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaHam: [{
                        shareCost: oldprice + 5,
                        oldCost: oldcostHam,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            } else if (findMarketone.PizzaHam[0].shareCost > 250) {
                const oldprice = findMarketone.PizzaHam[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaHam: [{
                        shareCost: oldprice - 5,
                        oldCost: oldcostHam,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            }
            console.log(`HAM WENT DOWN: ${changedfloorHam}`)
        }

        //               ----------------<Constructing interval for Sausage!>----------------

        const randomSausage = Math.random() * 2;
        const changedSausage = Math.random() * 5 + 1;
        const changedfloorSausage = Math.floor(changedSausage);
        if (randomSausage > 1) {

            const findMarketone = await Market.findOne({
                __v: 0,
            })
            const oldcostSausage = findMarketone.PizzaSausage[0].shareCost;

            const findMarket = await Market.findOneAndUpdate({
                __v: 0,
            }, {
                PizzaSausage: [{
                    shareCost: oldcostSausage + changedfloorSausage,
                    oldCost: oldcostSausage,
                    totalShares: 0,
                    changed1h: 0,
                    changed6h: 0,
                    changed24h: 0,
                }]
            })
            if (findMarketone.PizzaSausage[0].shareCost < 15) {
                const oldprice = findMarketone.PizzaSausage[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaSausage: [{
                        shareCost: oldprice + 5,
                        oldCost: oldcostSausage,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            } else if (findMarketone.PizzaSausage[0].shareCost > 250) {
                const oldprice = findMarketone.PizzaSausage[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaSausage: [{
                        shareCost: oldprice - 5,
                        oldCost: oldcostSausage,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            }
            //findUpgrades.upgradeTVad[0].level === 4
            console.log(`SAUSAGE WENT UP: ${changedfloorSausage}`)
        } else {
            const findMarketone = await Market.findOne({
                __v: 0,
            })
            const oldcostSausage = findMarketone.PizzaSausage[0].shareCost;

            const findMarket = await Market.findOneAndUpdate({
                __v: 0,
            }, {
                PizzaSausage: [{
                    shareCost: oldcostSausage - changedfloorSausage,
                    oldCost: oldcostSausage,
                    totalShares: 0,
                    changed1h: 0,
                    changed6h: 0,
                    changed24h: 0,
                }]
            })
            if (findMarketone.PizzaSausage[0].shareCost < 15) {
                const oldprice = findMarketone.PizzaSausage[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaSausage: [{
                        shareCost: oldprice + 5,
                        oldCost: oldcostSausage,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            } else if (findMarketone.PizzaSausage[0].shareCost > 250) {
                const oldprice = findMarketone.PizzaSausage[0].shareCost;
                const findMarket = await Market.findOneAndUpdate({
                    __v: 0,
                }, {
                    PizzaSausage: [{
                        shareCost: oldprice - 5,
                        oldCost: oldcostSausage,
                        totalShares: 0,
                        changed1h: 0,
                        changed6h: 0,
                        changed24h: 0,
                    }]
                })
            }
            console.log(`SAUSAGE WENT DOWN: ${changedfloorSausage}`)
        }
        val++;
        valcheck();
    }, 1000 * 15); // SET TO 1h!

    */
    //#endregion oldschedulers

    //#region valcheck

    /*
    let valcheck = () => {
        client.connection.query(`SELECT * FROM pizzasauce LEFT JOIN pizzacheese ON pizzasauce.tableAccess = pizzacheese.tableAccess LEFT JOIN pizzadough ON pizzasauce.tableAccess = pizzadough.tableAccess LEFT JOIN pizzaham ON pizzasauce.tableAccess = pizzaham.tableAccess LEFT JOIN pizzasausage ON pizzasauce.tableAccess = pizzasausage.tableAccess;`, function (error, results, fields) {
            if (val == 1) {
                client.connection.query(`UPDATE pizzasauce SET saucechanged1H = sauceshareCost; 
                UPDATE pizzacheese SET cheesechanged1H = cheeseshareCost;
                UPDATE pizzadough SET doughchanged1H = doughshareCost;
                UPDATE pizzaham SET hamchanged1H = hamshareCost;
                UPDATE pizzasausage SET sausagechanged1H = sausageshareCost;`)
                console.log("reached 1")
            }

            if (val == 6) {
                console.log("reached 6")
            }

            if (val == 24) {
                console.log("reached 24")
                val = 0;
            }
        });
    }
    */

    //#endregion valcheck

    //#region readyevent

    try {
        client.statcord.autopost(); // STATCORD TRY TO AUTOPOST!
        try {
            const stringlength = 69;
            console.log(`[LOGIN] <==> || I successfully logged into ${client.user.tag} and started ALL services || <==> [LOGIN]`)
        } catch {
            /* */
        }
        change_status(client);
        //loop through the status per each 10 minutes
        setInterval(() => {
            change_status(client);
        }, 1000 * 60 * 10);
    } catch (e) {
        console.log(String(e.stack))
    }
    //#endregion readyevent
});

/*

Code used in this script has been written by original PizzaParadise developer - PGamingHD#0666
Require assistance with scripts? Join the discord and get help right away! - https://discord.gg/pxySje4GPC
Other than that, please do note that it is required if you are using this to mention the original developer
Original Developer - PGamingHD#0666

*/