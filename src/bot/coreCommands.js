const bot = require('./bot');

bot.start((ctx) => {
    console.log("chat id " + ctx.chat.id);
    let emoji = "🤖";
    ctx.reply(`Hola amijo ${ctx.from.username}, soy ${ctx.botInfo.first_name} ${emoji} 
    \nSi quieres saber que puedo hacer por ti, escribe /help.
    `)
});

bot.help((ctx) => {
    
    ctx.replyWithMarkdown(`
*Info*
/tramites - informacion sobre trámites
/itinerarios - listado de itinerarios
/itinerario \\[itinerario\] - información sobre un itinerario
/asignaturas - listado asignaturas con sus siglas
/asignatura \\[asignatura\] - información sobre una asignatura
/plan - muestra el plan de estudios

*Grupos*
/telegram \\[grupo\] - enlace al grupo de telegram
/whatsapp \\[grupo\]- enlace al grupo de whatsapp 

*Recursos*
/mega - repo con materiales 
/discord - servidores discord de estudiantes

---
 `);

});

bot.on("text", ctx => {
    ctx.reply("comando incorrecto, /help para ver las opciones.");
})