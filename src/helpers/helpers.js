const dbfuncs = require('../helpers/dbfuncs');
const r2duocDB = dbfuncs.createConnection();

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
  function firstFunction() {
    return new Promise((resolve, reject) => {
      r2duocDB.each(`SELECT messageid FROM messages WHERE chatid = ${ctx.chat.id}`, function (err, row) {
        ctx.deleteMessage(row.messageid);
      });
      console.log('deleteMessages');
      resolve('ok');
    })
  }

  async function secondFunction() {
    console.log('before promise call');
    let result = await firstFunction()
    console.log('promise resolved:' + result);
    console.log('nex step');
    const r2duocDB = dbfuncs.createConnection();
    r2duocDB.run(`DELETE FROM messages WHERE chatid = ${ctx.chat.id}`)
    console.log('database messages deleted');
  }
  secondFunction();
}

function saveDataUsers(ctx) {
  dbfuncs.insertMessages(r2duocDB, ctx.chat.id, ctx.message.message_id);
  dbfuncs.insertMessages(r2duocDB, ctx.chat.id, ctx.message.message_id + 1);
}

function saveOneMessage(ctx) {
  dbfuncs.insertMessages(r2duocDB, ctx.chat.id, ctx.message.message_id);
}

module.exports = { parseCommand, clearHistory, saveDataUsers, saveOneMessage }