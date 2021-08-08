require('dotenv').config()
const DATABASE = process.env.DATABASE;
console.log(DATABASE)
function createConnection() {
    const sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database(DATABASE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the r2duoc database.');
      });

    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS messages (chatid TEXT, messageid TEXT)");
      });
    
    return db;

   /* db.serialize(function() {
      db.run("CREATE TABLE IF NOT EXISTS messages (info TEXT, newcamp TEXT)");
    
      var stmt = db.prepare("INSERT INTO messages VALUES (?, ?)");
      for (var i = 0; i < 5; i++) {
          stmt.run("Paco1" + i, " Message_id" + i );
      }
      stmt.finalize();
    
      db.each("SELECT rowid AS id, newcamp FROM messages", function(err, row) {
          console.log(row.id + ": " + row.info + row.newcamp);
      });
    });
    
    db.close(); */
}

function insertMessages(db, chatId, messageId) {
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO messages VALUES (?, ?)");        
        stmt.run(chatId, messageId);        
        stmt.finalize();

      });

      
      console.log('Inserted data Successfully.')

}

function queryMessagesByChatId() {

}


function deleteMessages() {

}

module.exports = { createConnection,  insertMessages, queryMessagesByChatId, deleteMessages }