import express from "express";
import morgan from "morgan";
import nunjucks from "nunjucks";
import sample from "lodash.sample";

const app = express();
const port = "8000";

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

// Run the server.
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:8000`);
});

const COMPLIMENTS = [
  "awesome",
  "terrific",
  "fantastic",
  "neato",
  "fantabulous",
  "wowza",
  "oh-so-not-meh",
  "brilliant",
  "ducky",
  "coolio",
  "incredible",
  "wonderful",
  "smashing",
  "lovely",
];

// Display the homepage
app.get("/", (req, res) => {
  res.render("index.html");
});

// Display a form that asks for the user's name.
app.get("/hello", (req, res) => {
  res.render("hello.html");
});

// Handle the form from /hello and greet the user.
app.get("/greet", (req, res) => {
  const name = req.query.name || "stranger";
  const compliment = sample(COMPLIMENTS);
  res.render("greet.html", {
    name: name,
    compliment: compliment,
  });
});

//Find the action with id game, create a variable for whether they want to play or not. If yes go to game page, if no go to goodbye page.
app.get("/game", (req, res) => {
  const userResponse = req.query.play;
  if (userResponse === "yes") {
    res.render("game.html");
  } else if (userResponse === "no") {
    res.render("goodbye.html");
  }
});

//After they play the game and hit submit it will take them to this page by finding the id madLib and then adding their answers to the final page.
app.post("/madLib", (req, res) => {
  const { name, color, noun, adjective } = req.body;

  res.render("madlib.html", {
    person: name,
    color: color,
    noun: noun,
    adjective: adjective,
  });
});
