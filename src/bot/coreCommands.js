const bot = require('./bot');
const dataDegree = require('./dataDegree.json');
const path = require('path');
const menu = require('./menu');
const helper = require('../helpers/helpers')
const language = require("./language");

const dataUsers = new Map();

bot.start((ctx) => {
    let idioma = helper.checkLanguage(ctx, dataUsers);
    let emoji = "🤖";
    switch (idioma) {
        case 0:
            ctx.replyWithMarkdown(`Hola ${ctx.from.username}, soy ${ctx.botInfo.first_name} ${emoji}
${language[idioma].start}`);
            break;
        case 1:
            ctx.replyWithMarkdown(`Hola ${ctx.from.username}, sóc en ${ctx.botInfo.first_name} ${emoji}
${language[idioma].start}`);
            break;
        case 2:
            ctx.replyWithMarkdown(`Hi ${ctx.from.username}, i'm ${ctx.botInfo.first_name} ${emoji}
${language[idioma].start}`);
            break;
        default:
            console.log("language error");
    }
    helper.saveDataUsers(ctx, dataUsers, idioma);


});

bot.command(["/help", "/ayuda", "/ajuda", "/h"], (ctx) => {

    let idioma = helper.checkLanguage(ctx, dataUsers);
    ctx.replyWithMarkdown(`${menu.help}`);
    helper.saveDataUsers(ctx, dataUsers, idioma);
});

bot.command(["/itinerario", "/iti", "/it"], (ctx) => {
    let idioma = helper.checkLanguage(ctx, dataUsers);
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

            console.log(dataUsers, photo);
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
    helper.saveDataUsers(ctx, dataUsers, idioma);
});
bot.command(["/asignatura", "/asig", "/a"], (ctx) => {
    let idioma = helper.checkLanguage(ctx, dataUsers);
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
    helper.saveDataUsers(ctx, dataUsers, idioma);
});

bot.command(["/plan", "/p"], (ctx) => {
    let idioma = helper.checkLanguage(ctx, dataUsers);
    ctx.replyWithMarkdown(`*Plan de estudios*\n https://estudios.uoc.edu/es/grados/ingenieria-informatica/plan-estudios`);
    helper.saveDataUsers(ctx, dataUsers, idioma);
});

bot.command(["/clear", "/c"], (ctx) => {
    if (dataUsers.get(ctx.chat.id) !== undefined) {
        let idioma = helper.checkLanguage(ctx, dataUsers);
        let tempMessages = dataUsers.get(ctx.chat.id)[1] + 1
        let tempArrayId = dataUsers.get(ctx.chat.id)[2]
        tempArrayId.push(ctx.message.message_id)
        dataUsers.set(ctx.chat.id, [idioma, tempMessages, tempArrayId])
        //dataUsers.set(ctx.chat.id, [idioma, tempMessages])
        console.log("number of messages", dataUsers.get(ctx.chat.id)[1]);
        helper.clearHistory(ctx, dataUsers);
        dataUsers.delete(ctx.chat.id);
        console.log(dataUsers);
    }




})

bot.command(["/idioma", "/language", "/id"], (ctx) => {
    let idioma = helper.checkLanguage(ctx, dataUsers);
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
    helper.saveDataUsers(ctx, dataUsers, idioma);
})

bot.command(["/telegram", "/tel", "/t"], (ctx) => {
    let idioma = helper.checkLanguage(ctx, dataUsers);
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
    helper.saveDataUsers(ctx, dataUsers, idioma);
});

bot.command(["/whatsapp", "/whats", "/w"], (ctx) => {
    let idioma = helper.checkLanguage(ctx, dataUsers);
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
    helper.saveDataUsers(ctx, dataUsers, idioma);
});

bot.command(["/mega", "/m"], (ctx) => {
    let idioma = helper.checkLanguage(ctx, dataUsers);
    ctx.reply(dataDegree.storage.mega);
    helper.saveDataUsers(ctx, dataUsers, idioma);
});

bot.command(["/wiki", "/wi"], (ctx) => {
    let idioma = helper.checkLanguage(ctx, dataUsers);
    ctx.reply("https://github.com/josanescod/r2duoc/wiki");
    helper.saveDataUsers(ctx, dataUsers, idioma);
});

bot.command(["/github", "/git", "/g"], (ctx) => {
    let idioma = helper.checkLanguage(ctx, dataUsers);
    ctx.reply(dataDegree.storage.github);
    helper.saveDataUsers(ctx, dataUsers, idioma);
});

bot.hears(["help", "ayuda", "ajuda"], (ctx) => {
    let idioma = helper.checkLanguage(ctx, dataUsers);
    if (dataUsers.get(ctx.chat.id)) {
        idioma = dataUsers.get(ctx.chat.id)[0]
    }
    ctx.reply(`${language[idioma].help}`);
    helper.saveDataUsers(ctx, dataUsers, idioma);
});

bot.on("text", ctx => {
    let idioma = helper.checkLanguage(ctx, dataUsers);
    ctx.reply(`${language[idioma].wrongText}`);
    helper.saveDataUsers(ctx, dataUsers, idioma);
});
