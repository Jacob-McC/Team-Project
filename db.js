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
      money INTEGER,
      upgrades TEXT
    )
  `);
  db.run(
    `INSERT INTO users (id,name,password,money,upgrades) VALUES ('0','Guest', 'Guestpass', '0', '0-0-0-0-0-0-0-0')`
  );
  //USERID 0 IS FOR GUEST USERS, THE VALUES IN IT SHOULD NEVER BE UPDATED
  //key word 'should'
  db.run(
    `INSERT INTO users (name,password,money,upgrades) VALUES ('testName', 'testpass', '10', '0-0-0-0-0-0-0-0')`
  );
  db.run(
    `INSERT INTO users (name,password,money,upgrades) VALUES ('testName2', 'testpass2', '509', '0-0-0-0-0-0-0-0')`
  );
  console.log("Database has been reset, i hope this was intentional...");
});

//very unsecure, i know
//fuck, this is more complex than i thought it would be
//will figure out next week
module.exports = db;
