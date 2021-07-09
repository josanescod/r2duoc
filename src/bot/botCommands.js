const bot = require('./bot');
const fetch = require("node-fetch");

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
