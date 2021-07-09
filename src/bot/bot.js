
const config = require("../config/config");
const { Telegraf } = require("telegraf");
const bot = new Telegraf(config.token);
bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
module.exports = bot;









