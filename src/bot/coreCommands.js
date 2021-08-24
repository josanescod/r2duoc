const bot = require('./bot');
const dataDegree = require('./dataDegree.json');
const path = require('path');
const menu = require('./menu');
const helper = require('../helpers/helpers')

bot.start((ctx) => {
    let emoji = "🤖";
    ctx.replyWithMarkdown(`Hola ${ctx.from.username}, soy ${ctx.botInfo.first_name} ${emoji}
Si quieres saber que puedo hacer por ti, escribe /help`);
    helper.saveDataUsers(ctx);
});

bot.command(["/help", "/ayuda", "/ajuda", "/h"], (ctx) => {
    ctx.replyWithMarkdown(`${menu.help}`);
    helper.saveDataUsers(ctx);
});

bot.command(["/itinerario", "/iti", "/it"], (ctx) => {
    let listSubjectsItineraries = "";
    helper.parseCommand(ctx);
    let arg = ctx.state.command.args[0];
    let obj;
    switch (arg) {
        case "all":
            let tempPath = path.join(__dirname, '../');
            let photo = tempPath + `assets/img/itineraries.png`;
            let listItineraris = "";
            obj = dataDegree.itineraries;
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    let val = obj[key];
                    listItineraris = val.name + "\n" + listItineraris;
                }
            }
            ctx.replyWithPhoto(
                { "source": photo },
                { "caption": listItineraris })
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
    helper.saveDataUsers(ctx);
});

bot.command(["/asignatura", "/asig", "/a"], (ctx) => {
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
                        if (val.referencia === arg) {
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
    helper.saveDataUsers(ctx);
});

bot.command(["/plan", "/p"], (ctx) => {
    ctx.replyWithMarkdown(`*Plan de estudios*\n https://estudios.uoc.edu/es/grados/ingenieria-informatica/plan-estudios`);
    helper.saveDataUsers(ctx);
});

bot.command(["/clear", "/c"], (ctx) => {
    function firstFunction() {
        return new Promise((resolve, reject) => {
            helper.saveOneMessage(ctx);
            console.log('task 1 completed');
            resolve('ok');
        })
    }
    async function secondFunction() {
        console.log('before promise call');
        //await fot the first function to complete
        let result = await firstFunction()
        console.log('promise resolved:' + result);
        console.log('nex step');
        helper.clearHistory(ctx);
    }
    secondFunction()
})


bot.command(["/telegram", "/tel", "/t"], (ctx) => {
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
            ctx.reply(`Link a ${selectedSubject}: ${selectedTelegram}`);
        } else {
            ctx.reply(`No existe esa asignatura`);
        }
    }
    helper.saveDataUsers(ctx);
});

bot.command(["/whatsapp", "/whats", "/w"], (ctx) => {
    //let idioma = helper.checkLanguage(ctx, dataUsers);
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
            ctx.reply(`Link a ${selectedSubject}: ${selectedWhatsapp}`);
        } else {
            ctx.reply(`No existe esa asignatura`);
        }
    }
    helper.saveDataUsers(ctx);
});

bot.command(["/mega", "/m"], (ctx) => {
    ctx.reply(dataDegree.storage.mega);
    helper.saveDataUsers(ctx);
});

bot.command(["/wiki", "/wi"], (ctx) => {
    ctx.reply("https://github.com/josanescod/r2duoc/wiki");
    helper.saveDataUsers(ctx);
});

bot.hears(["help", "ayuda", "ajuda"], (ctx) => {
    if (dataUsers.get(ctx.chat.id)) {
        //idioma = dataUsers.get(ctx.chat.id)[0]
    }
    ctx.reply(`${language[idioma].help}`);
    helper.saveDataUsers(ctx);
});

bot.on("text", ctx => {
    ctx.reply(`${language[idioma].wrongText}`);
    helper.saveDataUsers(ctx);
});
