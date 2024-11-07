const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = 3000;
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/public/register.html");
});
app.get("/AccountCreation", (req, res) => {
  res.sendFile(__dirname + "/public/AccountCreation.html");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//Do i know what this does? no. Is it needed? Probably.
//I cba to test whether it works without it
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database("./database.db");

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  // Insert form data into the SQLite database
  // The '?' are temp values that are then filled based on the parameters passed in
  const sql = `INSERT INTO users (name, password, money) VALUES (?, ?, 0)`;
  db.run(sql, [username, password], function (err) {
    if (err) {
      return res.status(500).send("Database error");
      //500 is an internal server error
    }
    res.redirect("/AccountCreation");
  });
});

//Future error to fix, check if the username is unique to avoid a very unlikely error from my shit code

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Insert form data into the SQLite database
  // The '?' are temp values that are then filled based on the parameters passed in
  const sql = `SELECT * FROM users WHERE name = ? AND password = ?`;
  db.get(sql, [username, password], (err, row) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    if (row) {
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  });
});
