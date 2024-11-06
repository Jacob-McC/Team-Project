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
    }
    res.redirect("/AccountCreation");
  });
});

//Need to create another for login
//Shouldn't be that hard, clueless
