const dbfuncs = require('../helpers/dbfuncs');

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

function clearHistory(ctx) {
  const r2duocDB = dbfuncs.createConnection();
  r2duocDB.each(`SELECT messageid FROM messages WHERE chatid= ${ctx.chat.id}`, function (err, row) {
    ctx.deleteMessage(row.messageid);
  });
  setTimeout(function(){ 
    r2duocDB.run(`DELETE FROM messages WHERE chatid= ${ctx.chat.id}`)
    dbfuncs.close(r2duocDB);
    console.log('messages deleted');
   }, 10000);
  /*r2duocDB.run(`DELETE FROM messages WHERE chatid= ${ctx.chat.id}`)
  dbfuncs.close(r2duocDB);
  console.log('messages deleted');*/
 

}

/* Check Language select on database?*/
function checkLanguage(ctx, dataUsers) {
  let idioma = 0;// 0 es, 1 ca, 2 en
  if (dataUsers.get(ctx.chat.id)) {
    idioma = dataUsers.get(ctx.chat.id)[0]
  }
  return idioma;
}

function saveDataUsers(ctx) {
  let r2duocDB = dbfuncs.createConnection();
  dbfuncs.insertMessages(r2duocDB, ctx.chat.id, ctx.message.message_id);
  dbfuncs.insertMessages(r2duocDB, ctx.chat.id, ctx.message.message_id + 1);
  dbfuncs.close(r2duocDB);
}

function saveMessageClearCommand(ctx) {
  let r2duocDB = dbfuncs.createConnection();
  dbfuncs.insertMessages(r2duocDB, ctx.chat.id, ctx.message.message_id);
  dbfuncs.close(r2duocDB);
}

module.exports = { parseCommand, clearHistory, checkLanguage, saveDataUsers, saveMessageClearCommand }