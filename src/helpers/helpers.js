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


    /* query db, selecting chat.id and delete messages_id, and delete db registers */
    let tempArrayId = dataUsers.get(ctx.chat.id)[2]
    //console.log(tempArrayId);
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


  /* DB */

  //queryMessagesByChatId(db) ctx.chat.id
  let r2duocDB = dbfuncs.createConnection(); 
  const testArray = dbfuncs.queryMessagesByChatId(r2duocDB,ctx.chat.id);
 
  r2duocDB.each(`SELECT rowid AS id, chatid, messageid FROM messages WHERE chatid= ${ctx.chat.id}`, function(err, row) {
    console.log(row.id + ": " + row.chatid + " " + row.messageid);
    
});
r2duocDB.run(`DELETE FROM messages WHERE chatid= ${ctx.chat.id}`)

  dbfuncs.close(r2duocDB);
}


function checkLanguage(ctx, dataUsers) {
  let idioma = 0;// 0 es, 1 ca, 2 en
  if (dataUsers.get(ctx.chat.id)) {
    idioma = dataUsers.get(ctx.chat.id)[0]
  }
  return idioma;
}

function saveDataUsers(ctx, dataUsers, idioma) {
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

  /*
  ctx.chat.id
  ctx.message.message_id
  every time that app send or response messages, insert
  chat.id and message_id on db
  */
 // DB
  let r2duocDB = dbfuncs.createConnection();  
  dbfuncs.insertMessages(r2duocDB, ctx.chat.id, ctx.message.message_id);
  dbfuncs.insertMessages(r2duocDB, ctx.chat.id, ctx.message.message_id + 1 );
  dbfuncs.close(r2duocDB);
 
}

module.exports = { parseCommand, clearHistory, checkLanguage, saveDataUsers }