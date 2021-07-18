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

function clearHistory(ctx,numMessages) {
  let k = 0;
  //si agregamos un numMessages de clear falla
  //asi parece que funcione
  for(let i = 0; i <= numMessages; i++ ){
        k =  ctx.message.message_id-i;
        ctx.deleteMessage(k)      
    }
  
    return numMessages = 0;
}

module.exports = { parseCommand, clearHistory }