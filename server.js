const express = require("express");

const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./src/routes/auth.routes")(app);
require("./src/routes/user.routes")(app);
require("./src/routes/news.routes")(app);

const PORT = process.env.PORT || 8080;

const db = require("./src/models");
const Role = db.role;

db.sequelize.sync({ alter: true }).then(() => {
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
}

app.listen(PORT, () =>
  console.log(`NewsAPI server is working on port ${PORT}!`)
);
