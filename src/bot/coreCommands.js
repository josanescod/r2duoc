const bot = require('./bot');
const dataDegree = require('./dataDegree.json');
const path = require('path');
const menu = require('./menu');
const middleware = require('../middleware/middleware')
const fetch = require("node-fetch");
const config = require("../config/config");
const language = require("./language");

let idioma = 0 //0,1,2
let chat_id = ""
let numMessages = 0;
console.log("numMessages:", numMessages, "idioma: ", idioma,
    "chat_id: ", chat_id);

bot.start((ctx) => {
    chat_id = ctx.chat.id
    console.log("chat id " + ctx.chat.id);
    let emoji = "🤖";
    switch (idioma) {
        case 0:
            ctx.reply(`Hola ${ctx.from.username}, soy ${ctx.botInfo.first_name} ${emoji} 
            \n${language[idioma].start}`);
            break;
        case 1:
            ctx.reply(`Hola ${ctx.from.username}, sóc en ${ctx.botInfo.first_name} ${emoji} 
            \n${language[idioma].start}`);
            break;
        case 2:
            ctx.reply(`Hi ${ctx.from.username}, i'm ${ctx.botInfo.first_name} ${emoji} 
            \n${language[idioma].start}`);
            break;
        default:
            console.log("language error");
    }
    numMessages = numMessages + 2;
    console.log(numMessages)

});

bot.help((ctx) => {
    ctx.replyWithMarkdown(`${menu.help}`);
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command(["/help", "/ayuda", "/ajuda"], (ctx) => {
    ctx.replyWithMarkdown(`${menu.help}`);
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command("/clear", (ctx) => {
    console.log(numMessages)
    numMessages = middleware.clearHistory(ctx, numMessages);
    console.log(numMessages);

})

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
            ctx.reply(`porfavor elige un itinerario válido [ si | ti | c | is | ic ]`);
            break;
    }
});

// todas o basicas, obligatorias optativas
bot.command("/asignaturas", (ctx) => {

    let listAsignaturas = "";
    let obj = dataDegree.asignaturas;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let val = obj[key];
            listAsignaturas = `${val.nombre} ${val.codigo} \n ${listAsignaturas}`;
        }
    }
    ctx.reply(listAsignaturas + "\nhttp://www.josanweb.com");
});

bot.command("/asignatura", (ctx) => {
    var selectedSubject = "";
    middleware.parseCommand(ctx);
    let arg = ctx.state.command.args[0];
    let obj = dataDegree.asignaturas;
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            var val = obj[key];
            //listAsignaturas = val.nombre + val.codigo + "\n" + listAsignaturas;
            //listAsignaturas = `${val.nombre} ${val.codigo} \n ${listAsignaturas}`;
            if (val.nombre === arg) {
                //console.log(val.nombre)
                selectedSubject = val.descripcion;
            }
        }
    }
    ctx.reply(selectedSubject);
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command(["/idioma", "/language"], (ctx) => {
    middleware.parseCommand(ctx);
    let arg = ctx.state.command.args[0];
    switch (arg) {
        case "es":
            ctx.reply(`idioma: es [OK]`);
            idioma = 0;
            break;
        case "ca":
            ctx.reply(`idioma: ca [OK]`);
            idioma = 1;
            break;
        case "en":
            ctx.reply(`language: en [OK]`);
            idioma = 2;
            break;
        default:
            ctx.reply(`${language[idioma].helpLang}`);
            break;
    }
    numMessages = numMessages + 2;
    console.log(numMessages)
})

bot.command("/plan", (ctx) => {
    ctx.replyWithMarkdown(`*Plan de estudios*\n https://estudios.uoc.edu/es/grados/ingenieria-informatica/plan-estudios`);
    //ctx.replyWithMarkdown(`*algebra*\n[grupo de algebra](https://www.google.com)`);
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command("/telegram", (ctx) => {
    middleware.parseCommand(ctx);
    let arg = ctx.state.command.args[0];

    if (arg === "all") {
        ctx.reply(dataDegree.groups.telegram);
    } else if (arg === undefined) {
        ctx.reply(`parametros válidos: nombre_asignatura/all`)

    }
    else {
        //buscará si el argumento coincide con un grupo/asignatura de telegram
        ctx.reply(`enlace a la asignatura ${arg}`)
    }//faltaria una tercera condicion si no existe la asignatura.    
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command("/whatsapp", (ctx) => {
    middleware.parseCommand(ctx);
    let arg = ctx.state.command.args[0];
    if (arg === "all") {
        ctx.reply(dataDegree.groups.whatsapp);
    } else if (arg === undefined) {
        ctx.reply(`parametros válidos: nombre_asignatura/all`)

    }
    else {
        //buscará si el argumento coincide con un grupo/asignatura de whatsapp
        ctx.reply(`enlace a la asignatura ${arg}`)
    }//faltaria una tercera condicion si no existe la asignatura.    


    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command("/mega", (ctx) => {
    ctx.reply(dataDegree.storage.mega);
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command("/discord", (ctx) => {
    ctx.reply("servidores discord");
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command("/github", (ctx) => {
    ctx.reply(dataDegree.storage.github);
    numMessages = numMessages + 2;
    console.log(numMessages)
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
    numMessages = numMessages + 2;
    console.log(numMessages)
})

bot.mention(["sisebuto", "Sisebuto"], (ctx) => {
    ctx.reply("Hola, escribe /help para ver en que te puedo ayudar 🤖");
});

bot.hears(["help", "ayuda", "ajuda"], (ctx) => {
    ctx.reply(`${language[idioma].help}`);

});

bot.on("text", ctx => {
    ctx.reply(`${language[idioma].wrongText}`);
    numMessages = numMessages + 2;
    console.log(numMessages)
});

