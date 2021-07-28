const { Markup } = require("telegraf");
const bot = require('./bot');



/*
console.log("user id ",ctx.update.message.from.id)
bot.telegram.sendMessage(888251391,"hola");
*/
bot.hears("!miweb", (ctx) => {
    ctx.reply("mi web es:");
    bot.url("mi web", "www.josanweb.com");
});

bot.hashtag("programming", ctx => {
    ctx.reply("asi que te gusta programar :D?")
});

//Events
bot.on("sticker", ctx => {
    ctx.reply("Buen sticker man");
});

const keyboard = Markup.keyboard([
    Markup.button.pollRequest('Create poll', 'regular'),
    Markup.button.pollRequest('Create quiz', 'quiz')
]);
//const bot = new Telegraf(token)

//bot.on('poll', (ctx) => console.log('Poll update', ctx.poll))
//bot.on('poll_answer', (ctx) => console.log('Poll answer', ctx.pollAnswer))

bot.start((ctx) => ctx.reply('supported commands: /poll /quiz', keyboard));

bot.command('poll', (ctx) =>
    ctx.replyWithPoll(
        'Cuantas asignaturas vas a cursar',
        ['1', '2', '3', '4', 'no lo sé'],
        { is_anonymous: false }
    )
);
bot.command('quiz', (ctx) =>
    ctx.replyWithQuiz(
        '2b|!2b',
        ['True', 'False'],
        { correct_option_id: 0 }
    )
);


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

});

let messages = [];
bot.on('message', (msg) => {
    messages.push(msg.update.message.message_id);
    console.log(messages, "number of messages: " + messages.length);
});

//Test keyboard options
