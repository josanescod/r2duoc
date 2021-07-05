const bot = require('./bot');
const fetch = require("node-fetch");

bot.start((ctx) => {
    console.log("chat id " + ctx.chat.id);
    let emoji = "😏";
    ctx.reply(`Hola amijo ${ctx.from.username}, soy ${ctx.botInfo.first_name} a sus ordenes  ${emoji} 
    \nSi quieres saber que puedo hacer por ti, escribe /help.
    `)


});


bot.help((ctx) => {
    ctx.replyWithMarkdown(`
*Ayuda*
/canta - canta una cancion
/delete - borra todos los mensajes
/help - comando de ayuda
/itineraries - list of itineraries
/api - muestra frase random
/poll - encuesta de prueba
/start - mensaje inicio
/settings - configuraciones

*Links*
/whatsapp - grupos de cada asignatura 
/telegram - grupos de cada asignatura
/mega - repo con materiales 
/discord -


*Test Hears*
!hola - saluda
!poweroff - apaga el bot
    `);

});


bot.settings((ctx) => {
    ctx.reply("Settings!")
});

bot.command(["canta", "Canta", "CANTA"], (ctx) => {
    ctx.reply("litros de alcohol corren por mis venas!");
})

bot.command("api", (ctx) => {
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
