const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      password TEXT
    )
  `);
});

//very unsecure, i know
//fuck, this is more complex than i thought it would be
//will figure out next week
module.exports = db;
