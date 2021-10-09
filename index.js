// npm install express
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
