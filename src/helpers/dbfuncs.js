require('dotenv').config()
const DATABASE = process.env.DATABASE;

function createConnection() {
  const sqlite3 = require('sqlite3').verbose();
  let db = new sqlite3.Database(DATABASE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the r2duoc database.');
  });

  db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS messages (chatid TEXT, messageid TEXT)");
  });
  return db;
}

function insertMessages(db, chatId, messageId) {
  db.serialize(function () {
    var stmt = db.prepare("INSERT INTO messages VALUES (?, ?)");
    stmt.run(chatId, messageId);
    stmt.finalize();

  });
  console.log('Inserted data Successfully.');
}

function close(db) {
  db.close();
  console.log('database closed');
}

module.exports = { createConnection, insertMessages, close }