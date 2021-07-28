const fetch = require("node-fetch");
require('dotenv').config();
const _ = require("lodash");
const bot = require('./bot');
const dataDegree = require('./dataDegree.json');
const path = require('path');
const menu = require('./menu');
const helper = require('../helpers/helpers')
const language = require("./language");

let idioma = 0 //0,1,2
let chat_id = ""
let numMessages = 0;
console.log("numMessages:", numMessages, "idioma: ", idioma,
    "chat_id: ", chat_id);

bot.start((ctx) => {
    chat_id = ctx.chat.id
    console.log("chat id " + ctx.chat.id);
    console.log("user id ",ctx.update.message.from.id)
    let emoji = "🤖";
    switch (idioma) {
        case 0:
            ctx.reply(`Hola ${ctx.from.username}, soy ${ctx.botInfo.first_name} ${emoji}
${language[idioma].start}`);
            break;
        case 1:
            ctx.reply(`Hola ${ctx.from.username}, sóc en ${ctx.botInfo.first_name} ${emoji}
${language[idioma].start}`);
            break;
        case 2:
            ctx.reply(`Hi ${ctx.from.username}, i'm ${ctx.botInfo.first_name} ${emoji}
${language[idioma].start}`);
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

bot.command(["/help", "/ayuda", "/ajuda","/h"], (ctx) => {
    ctx.replyWithMarkdown(`${menu.help}`);
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command("/clear", (ctx) => {
    console.log(numMessages)
    numMessages = helper.clearHistory(ctx, numMessages);
    console.log(numMessages);

})

bot.command("/tramites", (ctx) => {
    ctx.reply("tramites");
});

bot.command("/itinerario", (ctx) => {
    let listSubjectsItineraries = "";
    helper.parseCommand(ctx);
    let arg = ctx.state.command.args[0];
    let obj;
    switch (arg) {
        case "all":
            let tempPath = path.join(__dirname, '../');
            let photo = tempPath + `${process.env.ITINERARIE_IMG}`;
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
            numMessages = numMessages + 1
            break;
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
            ctx.reply(`porfavor elige una opción válida [ si | ti | c | is | ic | all ]`);
            break;
    }
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command(["/asignatura","/asig","/a"], (ctx) => {
    var selectedSubject = "no existe";
    helper.parseCommand(ctx);
    let arg = ctx.state.command.args[0];
    let obj = dataDegree.asignaturas;

    if (arg) {
        switch (arg) {
            case "all":
                let listAsignaturas = "";
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        let val = obj[key];
                        listAsignaturas = `${val.nombre} -> [ ${val.referencia} ] \n${listAsignaturas}`;
                    }
                }
                ctx.replyWithMarkdown(`*Asignatura* - *codigo*                
${listAsignaturas}
http://www.josanweb.com`);
                break;
            case "basica":
            case "ba":
                let listBasicas = "";
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        let val = obj[key];
                        if (val.tipo === "Básica") {
                            listBasicas = `${val.nombre} -> [ ${val.referencia} ] \n${listBasicas}`;
                        }

                    }
                }
                ctx.replyWithMarkdown(`*Básicas*                
${listBasicas}`)
                break;
            case "obligatoria":
            case "ob":
                let listObligatorias = "";
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        let val = obj[key];
                        if (val.tipo === "Obligatoria") {
                            listObligatorias = `${val.nombre} -> [ ${val.referencia} ] \n${listObligatorias}`;
                        }

                    }
                }
                ctx.replyWithMarkdown(`*Obligatorias*                
${listObligatorias}`)
                break;
            case "optativa":
            case "opt":
                let listOptativas = "";
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        let val = obj[key];
                        if (val.tipo === "Optativa") {
                            listOptativas = `${val.nombre} -> [ ${val.referencia} ] \n${listOptativas}`;
                        }

                    }
                }
                ctx.replyWithMarkdown(`*Optativas*                
${listOptativas}`)
                break;
            default:
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        var val = obj[key];
                        //listAsignaturas = val.nombre + val.codigo + "\n" + listAsignaturas;
                        //listAsignaturas = `${val.nombre} ${val.codigo} \n ${listAsignaturas}`;
                        if (val.referencia === arg) {
                            //console.log(val.nombre)
                            selectedSubject = val.descripcion;
                        }
                    }
                }
                ctx.reply(selectedSubject);
                break;
        }

    } else {
        ctx.reply(`porfavor elige una opción válida [ nombre | ba | ob | opt | all ]`);
    }
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command(["/idioma", "/language"], (ctx) => {
    helper.parseCommand(ctx);
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
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command(["/telegram","/tel","/t"], (ctx) => {
    helper.parseCommand(ctx);
    let arg = ctx.state.command.args[0];

    if (arg === "all") {
        ctx.reply(dataDegree.groups.telegram);
    } else if (arg === undefined) {
        ctx.reply(`porfavor elige una opción válida [ nombre | all ]`)

    }
    else {
        let obj = dataDegree.asignaturas;
        let selectedTelegram = "";
        let selectedSubject = "";
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                var val = obj[key];
                if (val.referencia === arg) {
                    selectedTelegram = val.telegram;
                    selectedSubject = val.nombre;
                }
            }
        }
        if (selectedSubject !== "") {
            ctx.reply(`Enlace a ${selectedSubject}: ${selectedTelegram}`);
        } else {
            ctx.reply(`No existe esa asignatura`);
        }
    }
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.command(["/whatsapp","/whats","/w"], (ctx) => {
    helper.parseCommand(ctx);
    let arg = ctx.state.command.args[0];
    if (arg === "all") {
        ctx.reply(dataDegree.groups.whatsapp);
    } else if (arg === undefined) {
        ctx.reply(`porfavor elige una opción válida [ nombre | all ]`)

    } else {
        let obj = dataDegree.asignaturas;
        let selectedWhatsapp = "";
        let selectedSubject = "";
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                var val = obj[key];
                if (val.referencia === arg) {
                    selectedWhatsapp = val.whatsapp;
                    selectedSubject = val.nombre;
                }
            }
        }
        if (selectedSubject !== "") {
            ctx.reply(`Enlace a ${selectedSubject}: ${selectedWhatsapp}`);
        } else {
            ctx.reply(`No existe esa asignatura`);
        }
    }
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

bot.mention(["Pacobot", "pacobot"], (ctx) => {
    ctx.reply("Hola, escribe /help para ver en que te puedo ayudar 🤖");
    numMessages = numMessages + 2;
    console.log(numMessages)
});

bot.hears(["help", "ayuda", "ajuda"], (ctx) => {
    ctx.reply(`${language[idioma].help}`);
    numMessages = numMessages + 2;
    console.log(numMessages)

});

bot.on("text", ctx => {
    ctx.reply(`${language[idioma].wrongText}`);
    numMessages = numMessages + 2;
    console.log(numMessages)
});

