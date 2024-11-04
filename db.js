const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.db");

//IMPORTANT
//THIS FILE IS PRACTICALLY A 'SCHEMA' FILE
//RUN THIS TO RESET THE DB OR PUT TEST VALUES IN
//IMPORTANT

//node db.js

db.serialize(() => {
  db.run(`DROP TABLE users`);
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      password TEXT,
      money INTEGER
    )
  `);
  db.run(
    `INSERT INTO users (name,password,money) VALUES ('testName', 'testpass', '10')`
  );
  db.run(
    `INSERT INTO users (name,password,money) VALUES ('testName2', 'testpass2', '509')`
  );
});

//very unsecure, i know
//fuck, this is more complex than i thought it would be
//will figure out next week
module.exports = db;
