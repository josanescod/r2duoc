
require('dotenv').config()
const { Telegraf } = require("telegraf");
const helper = require('../helpers/helpers')

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'https://your-heroku-app.herokuapp.com';
const API_TOKEN = process.env.API_TOKEN;
const bot = new Telegraf(API_TOKEN);

bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))


// Production
bot.telegram.setWebhook(`${URL}/bot${API_TOKEN}`);
bot.startWebhook(`/bot${API_TOKEN}`, null, PORT);

// Ping Heroku
helper.pingHeroku();

module.exports = bot;









