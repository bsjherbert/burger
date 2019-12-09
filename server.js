var exphbs = require("express-handlebars");
var express = require("express");
var mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Waynesworld13!",
  database: "burgers_db"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/", function (req, res) {
  connection.query("SELECT * FROM burgerTable;", function (err, data) {
    if (err) {
      return res.status(500).end();
    }

    res.render("index", { burgers: data });
  });
});

app.post("/api/burger", function (req, res) {
  connection.query("INSERT INTO burgerTable (burger_name, devoured) VALUES (?, ?)", [req.body.author, false], function (
    err,
    result
  ) {
    if (err) {

      return res.status(500).end();
    }

    res.json({ id: result.burger_name });
  });
});

app.put("/api/burger/:id", function (req, res) {
  console.log(req.body);
  connection.query(
    "UPDATE burgerTable SET devoured = true WHERE id = ?",
    [req.body.id],
    function (err, result) {
      if (err) {

        return res.status(500).end();
      }
      else if (result.changedRows === 0) {

        return res.status(404).end();
      }
      res.status(200).end();

    }
  );
});


app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
