// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up a static folder for client files that ignores the routes
app.use(express.static('public'))

// Star Wars Characters (DATA)
// =============================================================
var characters = [
  {
    routeName: "Table1",
    id: 1,
    name: "Zordon",
    email: "zordon@email.com",
    Phone: 111-111-1111
  },
  {
    routeName: "Table2",
    id: 2,
    name: "Chungus",
    email: "Chungus@email.com",
    Phone: 222-222-2222
    },
  {
    routeName: "Table3",
    id: 3,
    name: "Belthazar",
    email: "Belthazar@email.com",
    Phone: 333-333-3333
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "public/add.html"));
});

// Displays all characters
app.get("/api/characters", function(req, res) {
  return res.json(characters);
});

// Displays a single character, or returns false
app.get("/api/characters/:character", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newCharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newCharacter);

  characters.push(newCharacter);

  res.json(newCharacter);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
