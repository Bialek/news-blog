const express = require("express");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("client/build"));

require("./src/routes/auth.routes")(app);
require("./src/routes/news.routes")(app);
require("./src/routes/dictionary.routes")(app);
require("./src/routes/comment.routes")(app);

const PORT = process.env.PORT || 8080;

const db = require("./src/models");
const Role = db.role;
const Dictionary = db.dictionary;

db.sequelize.sync().then(() => {
  console.log("Drop and Resync Db");
  initial();
});

function initial() {
  Role.create({
    name: "admin",
  });
  Role.create({
    name: "user",
  });
  Role.create({
    name: "moderator",
  });
  Dictionary.create({
    name: "Category Lorem",
    type: "news_category",
  });
  Dictionary.create({
    name: "Category Ipsum ",
    type: "news_category",
  });
  Dictionary.create({
    name: "Category dolor ",
    type: "news_category",
  });
  Dictionary.create({
    name: "Category sit ",
    type: "news_category",
  });
  Dictionary.create({
    name: "Category amet",
    type: "news_category",
  });
}

app.listen(PORT, () =>
  console.log(`NewsAPI server is working on port ${PORT}!`)
);
