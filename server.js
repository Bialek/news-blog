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

db.sequelize.sync();

app.listen(PORT, () =>
  console.log(`NewsAPI server is working on port ${PORT}!`)
);
