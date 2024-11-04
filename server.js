const express = require("express");
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
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
