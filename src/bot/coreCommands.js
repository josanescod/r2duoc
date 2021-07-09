const bot = require('./bot');
const dataInfo = require('./dataInfo.json');
const path = require('path');
const menu = require('./menu');
const middleware = require('../middleware/middleware')

bot.command("itinerario", (ctx) => {

    middleware.parseCommand(ctx);

    let arg = ctx.state.command.args[0];
    switch (arg) {
        case "si":
            ctx.reply("Has elegido el itinerario de Sistemas de información")
            break;
        case "ti":
            ctx.reply("Has elegido el itinerario de Tecnologías de la información")
            break;
        case "c":
            ctx.reply("Has elegido el itinerario de Computación")
            break;
        case "is":
            ctx.reply("Has elegido el itinerario de Ingenieria de software")
            break;
        case "ic":
            ctx.reply("Has elegido el itinerario de Ingenieria de computadores")
            break;
        default:
            ctx.reply(`porfavor elige un itinerario válido [SI-TI-C-IS-IC].`);
            break;
    }
})

bot.start((ctx) => {
    console.log("chat id " + ctx.chat.id);
    let emoji = "🤖";
    ctx.reply(`Hola amijo ${ctx.from.username}, soy ${ctx.botInfo.first_name} ${emoji} 
    \nSi quieres saber que puedo hacer por ti, escribe /help.
    `)
});

bot.help((ctx) => {
    ctx.replyWithMarkdown(`${menu.help}
 `);

});

//split command by command?
bot.command(["whatsapp", "telegram", "mega", "itinerarios"], (ctx) => {
    let option = ctx.message.text;
    if (option === "/whatsapp") {
        ctx.reply(dataInfo[0].groups.whatsapp);

    } else if (option === "/telegram") {
        ctx.reply(dataInfo[0].groups.telegram);

    } else if (option === "/mega") {
        ctx.reply(dataInfo[0].storage.mega);

    } else if (option === "/itinerarios") {

        let tempPath = path.join(__dirname, '../');
        let photo = tempPath + "assets/img/itineraries.png";
        //ctx.reply("Create a scene o stage?");
        ctx.replyWithPhoto({ source: photo });

        setTimeout(function () {
            let listItineraris = "";
            let obj = dataInfo[0].itineraries;
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    let val = obj[key];
                    console.log(val.name);
                    listItineraris = val.name + "\n" + listItineraris;
                }
            }
            ctx.reply(listItineraris + "\nhttp://www.josanweb.com");
        }, 500);

    }
})

bot.on("text", ctx => {
    ctx.reply("comando incorrecto, /help para ver las opciones.");
})