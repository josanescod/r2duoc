require('./bot/coreCommands');


/* only TESTING */

const bot = require('./bot/bot');
setInterval(function () {
    bot.telegram.sendMessage(888251391, "Han pasado 20 minutos");
}, 600000);


/* TODO

pass all urls to env variables

change switch for object? or array of options?
use a database to store user_ids, and send message to ids to send updates?
show stats

*/