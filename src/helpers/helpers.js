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

function clearHistory(ctx, dataUsers) {
  console.log("=====>", ctx.chat.id, dataUsers.get(ctx.chat.id)[1], dataUsers.get(ctx.chat.id)[2])

  if (dataUsers.get(ctx.chat.id)[1] > 0) {
    /*let k;
    for (let i = 0; i < (numMessages-1); i++) {
      k = ctx.message.message_id - i;
      console.log(ctx.message.message_id)
      console.log(k)
      ctx.deleteMessage(k)
      
    }
    //ctx.deleteMessage(ctx.message.message_id);*/
    let tempArrayId = dataUsers.get(ctx.chat.id)[2]
    console.log(tempArrayId);
    tempArrayId.forEach(function (i, id) {
      try {
        ctx.deleteMessage(i)
      } catch (ex) {
        console.log("NO EXISTE ESE MENSAJE")
      }


    })
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
    let tempArrayId = dataUsers.get(ctx.chat.id)[2]
    tempArrayId.push(ctx.message.message_id)
    tempArrayId.push(ctx.message.message_id + 1)
    dataUsers.set(ctx.chat.id, [idioma, tempMessages, tempArrayId])

    console.log(dataUsers);
  } else {

    dataUsers.set(ctx.chat.id, [idioma, 2, [ctx.message.message_id, ctx.message.message_id + 1]]);
    console.log(dataUsers);

  }

}

module.exports = { parseCommand, clearHistory, checkLanguage, updateDataUsers }