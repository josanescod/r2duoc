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
}


function checkLanguage(ctx, dataUsers) {
  let idioma = 0;// 0 es, 1 ca, 2 en
  if (dataUsers.get(ctx.chat.id)) {
    idioma = dataUsers.get(ctx.chat.id)[0]
  }
  return idioma;
}

function updateDataUsers(ctx, dataUsers, idioma) {
  if (dataUsers.get(ctx.chat.id)) {
    let tempMessages = dataUsers.get(ctx.chat.id)[1] + 2
    dataUsers.set(ctx.chat.id, [idioma, tempMessages])
    console.log(dataUsers);
  } else {
    dataUsers.set(ctx.chat.id, [idioma, 2]);
    console.log(dataUsers);

  }

}

module.exports = { parseCommand, clearHistory, checkLanguage, updateDataUsers }