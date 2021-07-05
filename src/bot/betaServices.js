const { Markup } = require("telegraf");
const superheroes = require("superheroes");
const bot = require('./bot');
const dataInfo = require('./dataInfo.json');



bot.command(["whatsapp", "telegram", "mega", "itineraries"], (ctx) => {
    let option = ctx.message.text;
    if (option === "/whatsapp") {
        ctx.reply(dataInfo[0].groups.whatsapp);

    } else if (option === "/telegram") {
        ctx.reply(dataInfo[0].groups.telegram);

    } else if (option === "/mega") {
        ctx.reply(dataInfo[0].storage.mega);

    } else if (option === "/itineraries") {
        ///home/josan/proyectos_web/node-tel-bot/src/bot../assets/img/itineraries.png
        __dirname = "/home/josan/proyectos_web/node-tel-bot/src/"
        console.log(__dirname);
        let photo = __dirname +  'assets/img/itineraries.png'
        //let photo = '/home/josan/proyectos_web/node-tel-bot/src/assets/img/itineraries.png'
        ctx.reply("Create a scene o stage?");
        ctx.replyWithPhoto({ source:photo });

        setTimeout(function(){
            let listItineraris = "";
            let obj = dataInfo[0].itineraries;
            for (let key in obj) {
             if (obj.hasOwnProperty(key)) {
                let val = obj[key];
                console.log(val.name);
                listItineraris = val.name + "\n" + listItineraris;
            }
        }
        ctx.reply(listItineraris+"\nhttp://www.josanweb.com");
         }, 500);
        
    }
})

bot.hears("!algebra", (ctx) => {
    ctx.reply("estos son todos los recursos de algebra que tengo");
    ctx.reply("toma nota:");
    setTimeout(() => {
        ctx.reply("http://josanweb.com");
    }, 1000);

})

bot.hears("!stop", (ctx) => {
    clearInterval(saludador);
})

bot.hears("!poweroff", (ctx) => {
    // Enable graceful stop
    ctx.reply("apagando...");
    bot.stop('SIGINT')
    bot.stop('SIGTERM')


})

bot.hears("!computer", (ctx) => {
    ctx.reply("Ei yo vendo computadoras lo sabias?");
})

bot.hears("!miweb", (ctx) => {
    ctx.reply("mi web es:");
    bot.url("mi web", "www.josanweb.com");
})

bot.hears("!hola", (ctx) => {
    let emoji = "😏";
    let superName = superheroes.random();
    ctx.reply(`Ei hola! ${ctx.from.username}  ${emoji}`);
    ctx.reply(`Tu nombre de superheroe es: ${superName}`);

})


bot.mention(["Botfather", "botfather"], (ctx) => {
    ctx.reply("Has mencionado a Botfather ;)");
})

bot.mention(["sisebutohelp", "Sisebuto"], (ctx) => {
    ctx.reply("Ei en que te puedo ayudar? ;)");
})


bot.hashtag("programming", ctx => {
    ctx.reply("asi que te gusta programar :D?")
});

//Events
bot.on("sticker", ctx => {
    ctx.reply("Buen sticker man");
})

const keyboard = Markup.keyboard([
    Markup.button.pollRequest('Create poll', 'regular'),
    Markup.button.pollRequest('Create quiz', 'quiz')
])
//const bot = new Telegraf(token)

//bot.on('poll', (ctx) => console.log('Poll update', ctx.poll))
//bot.on('poll_answer', (ctx) => console.log('Poll answer', ctx.pollAnswer))

bot.start((ctx) => ctx.reply('supported commands: /poll /quiz', keyboard))

bot.command('poll', (ctx) =>
    ctx.replyWithPoll(
        'Cuantas asignaturas vas a cursar',
        ['1', '2', '3', '4', 'no lo sé'],
        { is_anonymous: false }
    )
)
bot.command('quiz', (ctx) =>
    ctx.replyWithQuiz(
        '2b|!2b',
        ['True', 'False'],
        { correct_option_id: 0 }
    )
)


//Test to delete user messages

bot.command('delete', (ctx) => {

    for (let i = 0; i <= (messages.length - 1); i++) {
        console.log('borrando: ' + messages[i]);
        ctx.deleteMessage(messages[i]);
    }
    console.log(messages);
    messages = [];
    console.log("mensajes borrados");
    console.log(messages);

})

let messages = [];
bot.on('message', (msg) => {
    messages.push(msg.update.message.message_id);
    console.log(messages, "number of messages: " + messages.length);
})