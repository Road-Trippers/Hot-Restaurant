var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [];
var wait_list = [];

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "app/public/reserve.html"));
});
app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "app/public/tables.html"));
});

app.get("/api/tables", function (req, res) {
  return res.json(tables);
});

app.get("/api/wait_list", function (req, res) {
  return res.json(wait_list);
});

app.post("/api/tables", function (req, res) {
  let newTable = req.body;
  if (tables.length < 5) {
    tables.push(newTable);
  } else {
    wait_list.push(newTable);
  }
  res.json(true);
});

app.post("/api/clear_tables", function (req, res) {
  tables = [];
  wait_list = [];
  res.json(true);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});