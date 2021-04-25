const { authJwt } = require("../middleware");
const controller = require("../controllers/news.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/news/getById/:newsId", controller.getById);
  app.get(
    "/api/news/getByIdForEdit/:newsId",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.getByIdForEdit
  );
  app.get(
    "/api/news/getAll",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.getAll
  );
  app.post(
    "/api/news/create",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.create
  );
  app.put(
    "/api/news/edit",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.update
  );
  app.delete(
    "/api/news/delete/:newsId",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.delete
  );
  app.put(
    "/api/news/publish/:newsId",
    [authJwt.verifyToken, authJwt.isModeratorOrAdmin],
    controller.publish
  );
  app.get("/api/news/getAllNewest/:categoryId", controller.getAllNewest);
};
