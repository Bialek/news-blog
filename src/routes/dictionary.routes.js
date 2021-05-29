const controller = require("../controllers/dictionary.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/dictionary/getAll", controller.getAll);
  app.post(
    "/api/dictionary/create",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.create
  );
  app.put(
    "/api/dictionary/edit",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.update
  );
  app.delete(
    "/api/dictionary/delete/:dictionaryId",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.delete
  );
};
