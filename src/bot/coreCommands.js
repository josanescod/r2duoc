const bot = require('./bot');
const dataDegree = require('./dataDegree.json');
const path = require('path');
const menu = require('./menu');
const middleware = require('../middleware/middleware')
const fetch = require("node-fetch");
const config = require("../config/config");

bot.start((ctx) => {    
    //console.log("chat id " + ctx.chat.id);
    let emoji = "🤖";
    ctx.reply(`Hola ${ctx.from.username}, soy ${ctx.botInfo.first_name} ${emoji} 
    \nSi quieres saber que puedo hacer por ti, escribe /help.
    `)
});

bot.help((ctx) => {
    ctx.replyWithMarkdown(`${menu.help}`);
});

bot.command("/tramites", (ctx) => {
    ctx.reply("tramites");
});

bot.command("/itinerarios", (ctx) => {
    let tempPath = path.join(__dirname, '../');    
    let photo = tempPath + `${config.itinerarieImg}`;  
    //ctx.reply("Create a scene o stage?");
    ctx.replyWithPhoto({ source: photo });
    setTimeout(function () {
        let listItineraris = "";
        let obj = dataDegree.itineraries;
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                let val = obj[key];                
                listItineraris = val.name + "\n" + listItineraris;
            }
        }
        ctx.reply(listItineraris + "\nhttp://www.josanweb.com");
    }, 1000);

});

bot.command("/itinerario", (ctx) => {
    let listSubjectsItineraries = "";
    middleware.parseCommand(ctx);

    let arg = ctx.state.command.args[0];
    let obj;
    switch (arg) {
        case "si":
        case "sistemas":
            obj = dataDegree.itineraries[4].subjects;
            for (i = 0; i < obj.length; i++) {
                listSubjectsItineraries = obj[i] + "\n" + listSubjectsItineraries
            }
            ctx.replyWithMarkdown(`*Sistemas de información:*\n${listSubjectsItineraries}
            `);
            break;
        case "ti":
        case "tecnologias":
            obj = dataDegree.itineraries[3].subjects;
            for (i = 0; i < obj.length; i++) {
                listSubjectsItineraries = obj[i] + "\n" + listSubjectsItineraries
            }
            ctx.replyWithMarkdown(`*Tecnologías de la información:*\n${listSubjectsItineraries}
            `);
            break;
        case "c":
        case "computacion":
            obj = dataDegree.itineraries[2].subjects;
            for (i = 0; i < obj.length; i++) {
                listSubjectsItineraries = obj[i] + "\n" + listSubjectsItineraries
            }
            ctx.replyWithMarkdown(`*Computación:*\n${listSubjectsItineraries}
            `);
            break;
        case "is":
        case "software":
            obj = dataDegree.itineraries[1].subjects;
            for (i = 0; i < obj.length; i++) {
                listSubjectsItineraries = obj[i] + "\n" + listSubjectsItineraries
            }
            ctx.replyWithMarkdown(`*Ingenieria del software:*\n${listSubjectsItineraries}
            `);
            break;
        case "ic":
        case "computadores":
            obj = dataDegree.itineraries[0].subjects;
            for (i = 0; i < obj.length; i++) {
                listSubjectsItineraries = obj[i] + "\n" + listSubjectsItineraries
            }
            ctx.replyWithMarkdown(`*Ingenieria de computadores:*\n${listSubjectsItineraries}
            `);
            break;
        default:
            ctx.reply(`porfavor elige un itinerario válido [ si-ti-c-is-ic ].`);
            break;
    }
});

bot.command("/asignaturas", (ctx) => {
    ctx.reply("listado de asignaturas");
});

bot.command("/asignatura", (ctx) => {
    ctx.reply("info de asignatura");
});

bot.command("/plan", (ctx) => {
    ctx.reply("info plan de estudios");
});

bot.command("/telegram", (ctx) => {
    ctx.reply(dataDegree[0].groups.telegram);
});

bot.command("/whatsapp", (ctx) => {
    ctx.reply(dataDegree[0].groups.whatsapp);
});


bot.command("/mega", (ctx) => {
    ctx.reply(dataDegree[0].storage.mega);
});

bot.command("/discord", (ctx) => {
    ctx.reply("servidores discord");
});

bot.command("/github", (ctx) => {
    ctx.reply(dataDegree[0].storage.github);
});


bot.command("/api", (ctx) => {
    async function fetchData() {
        let response = await fetch('https://www.boredapi.com/api/activity');
        let data = await response.json();
        data = JSON.stringify(data);
        data = JSON.parse(data);
        return data;
    }

    async function main() {
        let abc = await fetchData();
        console.log(abc.activity);
        ctx.reply("frase: " + abc.activity);
    }
    main();
})

bot.mention(["sisebuto", "Sisebuto"], (ctx) => {
    ctx.reply("Hola, escribe /help para ver en que te puedo ayudar 🤖");
});

bot.on("text", ctx => {
    ctx.reply("comando incorrecto, /help para ver las opciones.");
});

