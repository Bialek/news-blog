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

db.sequelize.sync({ force: true }).then(() => {
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

// let newsApiService = new api.NewsApiService();

// app.post("/auth/login", cors(), (request, response) => {
//   response.header("Access-Control-Allow-Origin", "*");
//   let login = request.body.login;
//   let password = request.body.password;

//   const user = users[login];

//   if (!user) {
//     return response
//       .status(400)
//       .json({ logged: false, message: `User not exists ${login}.` });
//   } else {
//     if (user.password !== password) {
//       response
//         .status(400)
//         .json({ logged: false, message: `Password is not valid.` });
//     } else {
//       response.status(200).json({
//         logged: true,
//         hasAdminPermissions: user.hasAdminPermissions,
//         name: user.name,
//         surname: user.surname,
//       });
//     }
//   }
// });

// app.get("/userDetails/:login", cors(), function (request, response) {
//   response.header("Access-Control-Allow-Origin", "*");
//   let login = request.params.login;
//   let data = users[login];
//   response.status(200).send(data);
// });

// app.get("/allUsers", cors(), function (request, response) {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.status(200).send(users);
// });

// app.get("/news/list", cors(), function (request, response) {
//   response.header("Access-Control-Allow-Origin", "*");
//   let res = newsApiService.getNewsList();
//   console.log(`RESPONCE getNewsList ${JSON.stringify(res)};`);
//   response.status(200).send(res);
// });

// app.get("/news/getById/:id", cors(), function (request, response) {
//   response.header("Access-Control-Allow-Origin", "*");
//   const res = newsApiService.getNewsById(request.params.id);

//   if (res) {
//     response.status(200).send(res);
//   } else {
//     response.status(404).send("Not Found");
//   }
// });

// app.post("/news/add", cors(), function (request, response) {
//   console.log(`REQUEST addNews ${JSON.stringify(request.body)};`);
//   response.header("Access-Control-Allow-Origin", "*");
//   let res = newsApiService.addNews(request.body);
//   console.log(res);
//   console.log(`RESPONCE addNews ${JSON.stringify(res)};`);
//   response.status(200).send(res);
// });

// app.post("/news/modify", cors(), function (request, response) {
//   console.log(`REQUEST modifyNews ${JSON.stringify(request.body)};`);
//   response.header("Access-Control-Allow-Origin", "*");
//   let res = newsApiService.modifyNews(request.body);
//   console.log(`RESPONCE modifyNews ${JSON.stringify(res)};`);
//   response.status(200).send(res);
// });

// app.delete("/news/remove/:id", cors(), function (request, response) {
//   response.header("Access-Control-Allow-Origin", "*");
//   console.log(`REQUEST removeNews ${request.params.id};`);

//   let res = newsApiService.removeNews(request.params.id);
//   console.log(`RESPONCE removeNews ${JSON.stringify(res)};`);
//   response.status(200).send(res);
// });

// app.get("/news/commentsList/:id", cors(), function (request, response) {
//   response.header("Access-Control-Allow-Origin", "*");
//   console.log(`REQUEST commentsList ${request.params.id};`);

//   let res = newsApiService.getNewsComments(request.params.id);
//   console.log(`RESPONCE getNewsComments ${JSON.stringify(res)};`);
//   response.status(200).send(res);
// });

// app.post("/comments/add", cors(), function (request, response) {
//   console.log(`REQUEST addComment ${JSON.stringify(request.body)};`);
//   response.header("Access-Control-Allow-Origin", "*");
//   let res = newsApiService.addComment(request.body);
//   console.log(`RESPONCE addComment ${JSON.stringify(res)};`);
//   response.status(200).send(res);
// });

// app.delete("/comments/remove/:id", cors(), function (request, response) {
//   response.header("Access-Control-Allow-Origin", "*");
//   console.log(`REQUEST removeComment ${request.params.id};`);
//   let res = newsApiService.removeComment(request.params.id);
//   console.log(`RESPONCE removeComment ${JSON.stringify(res)};`);
//   response.status(200).send(res);
// });

app.listen(PORT, () =>
  console.log(`NewsAPI server is working on port ${PORT}!`)
);
