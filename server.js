// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const fs = require("fs");
var x,
  code = [],
  def = [];
fs.readFile("codes.txt", "utf8", function(err, data) {
  if (err) throw err;
  console.log("OK: " + "codes.txt");
  x = data.split("\n");
  for (var i = 0; i < x.length; i++) {
    x[i] = x[i].trim().split("/");
    code.push(x[i][0].trim());
    def.push(x[i][1].trim());
  }
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(x);
});

app.get("/:code", (req, res) => {
  var data = {};
  data.code = req.params.code;
  data.def = def[code.indexOf(data.code)];
  if (data.def) {
    data.exists = true;
    res.send(data);
  } else {
    res.send({exists:false});
  }
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
