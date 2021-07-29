
function caffeine() {
  var https = require("https");
  setInterval(function () {
    https.get(process.env.URL);
    //console.log("get a la url a los 20 minutos");
  }, 1200000); // every 10 minutes (600000)
}

function parseCommand(ctx) {
  const text = ctx.update.message.text.toLowerCase()
  if (text.startsWith('/')) {
    const match = text.match(/^\/([^\s]+)\s?(.+)?/)
    let args = []
    let command
    if (match !== null) {
      if (match[1]) {
        command = match[1]
      }
      if (match[2]) {
        args = match[2].split(' ')
      }
    }
    ctx.state.command = {
      raw: text,
      command,
      args
    }
  }
}

function clearHistory(ctx, numMessages) {
  if (numMessages > 0) {
    let k = 0;
    for (let i = 0; i <= numMessages; i++) {
      k = ctx.message.message_id - i;
      ctx.deleteMessage(k)
    }
  } else {
    ctx.deleteMessage(ctx.message.message_id);
  }
  return numMessages = 0;
}


module.exports = { parseCommand, clearHistory, caffeine }