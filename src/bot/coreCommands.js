const bot = require('./bot');
const dataInfo = require('./dataInfo.json');
const path = require('path');
const menu = require('./menu');
const middleware = require('../middleware/middleware')

bot.command("itinerario", (ctx) => {
    let listSubjectsItineraries = "";
    middleware.parseCommand(ctx);

    let arg = ctx.state.command.args[0];
    let obj;
    switch (arg) {
        case "si":
        case "sistemas":
            obj = dataInfo[0].itineraries[4].subjects;
            for (i = 0; i < obj.length ; i++) {                
                listSubjectsItineraries = obj[i]  + "\n" +listSubjectsItineraries 
            }            
            ctx.replyWithMarkdown(`*Sistemas de información:*\n${listSubjectsItineraries}
            `);           
            break;       
        case "ti":
        case "tecnologias":            
            obj = dataInfo[0].itineraries[3].subjects;
            for (i = 0; i < obj.length ; i++) {                
                listSubjectsItineraries = obj[i]  + "\n" +listSubjectsItineraries 
            }            
            ctx.replyWithMarkdown(`*Tecnologías de la información:*\n${listSubjectsItineraries}
            `);           
            break;
        case "c":
        case "computacion":
            obj = dataInfo[0].itineraries[2].subjects;
            for (i = 0; i < obj.length ; i++) {                
                listSubjectsItineraries = obj[i]  + "\n" +listSubjectsItineraries 
            }            
            ctx.replyWithMarkdown(`*Computación:*\n${listSubjectsItineraries}
            `);           
            break;
        case "is":
        case "software":
            obj = dataInfo[0].itineraries[1].subjects;
            for (i = 0; i < obj.length ; i++) {                
                listSubjectsItineraries = obj[i]  + "\n" +listSubjectsItineraries 
            }            
            ctx.replyWithMarkdown(`*Ingenieria del software:*\n${listSubjectsItineraries}
            `);           
            break;
        case "ic":
        case "computadores":
            obj = dataInfo[0].itineraries[0].subjects;
            for (i = 0; i < obj.length ; i++) {                
                listSubjectsItineraries = obj[i]  + "\n" +listSubjectsItineraries 
            }            
            ctx.replyWithMarkdown(`*Ingenieria de computadores:*\n${listSubjectsItineraries}
            `);           
            break;
        default:
            ctx.reply(`porfavor elige un itinerario válido [SI-TI-C-IS-IC].`);
            break;
    }
})

bot.start((ctx) => {
    console.log("chat id " + ctx.chat.id);
    let emoji = "🤖";
    ctx.reply(`Hola ${ctx.from.username}, soy ${ctx.botInfo.first_name} ${emoji} 
    \nSi quieres saber que puedo hacer por ti, escribe /help.
    `)
});

bot.help((ctx) => {
    ctx.replyWithMarkdown(`${menu.help}🤖
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

bot.mention(["sisebuto", "Sisebuto"], (ctx) => {
    ctx.reply("Hola, escribe /help para ver en que te puedo ayudar 🤖");
})


bot.on("text", ctx => {
    ctx.reply("comando incorrecto, /help para ver las opciones.");
})