const db = require("../models");
const News = db.news;
const Minature = db.miniature;
const Op = db.Sequelize.Op;

exports.getAll = (req, res) => {
  const categoryId = req.params.categoryId;
  const query = new URLSearchParams(req.query).get("query");

  const where = {};
  if (categoryId) {
    where.categoryId = categoryId;
  }
  if (query) {
    where.title = {
      [Op.like]: `%${query}%`,
    };
  }

  News.findAll({ where }, { order: [["publishDate", "DESC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send({
        message: `"An error occurred while trying to get! ${error}`,
      });
    });
};

exports.getById = async (req, res) => {
  const id = req.params.newsId;

  try {
    const news = await News.findByPk(id);
    const author = await news.getUser();

    res.send({ ...news.dataValues, authorName: author.dataValues.username });
  } catch (error) {
    res.status(500).send({
      message: error || "internal server error",
    });
  }
};

exports.getByIdForEdit = (req, res) => {
  const id = req.params.newsId;

  News.findByPk(id)
    .then((data) => {
      data
        .getMiniature()
        .then((miniature) => {
          const response = { ...data.dataValues, ...miniature.dataValues };
          res.status(200).send(response);
        })
        .catch((err) => {
          res.status(500).send({
            message: err || "internal server error",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "internal server error",
      });
    });
};

exports.create = async (req, res) => {
  req.body.published = false;
  req.body.authorId = req.userId;
  try {
    const news = await News.create(req.body);
    const miniature = await Minature.create(req.body);
    news.setMiniature(miniature);
    news.setUser(req.userId);
    res.status(200).send({
      message: "News has been creted!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.mesage || "An error occurred while trying to create",
    });
  }
};

exports.update = (req, res) => {
  const id = req.body.newsId;
  News.update({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "News has been saved!",
        });
      } else {
        res.send({
          message: `You cannot edit the news about o id=${id}. It is possible that it cannot be found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "An error occurred while trying to edit the news",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.newsId;
  News.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "News has been removed!",
        });
      } else {
        res.send({
          message: `It is not possible to delete the news id=${id}. It is possible that it cannot be found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "An error occurred while trying to delete the news",
      });
    });
};

exports.publish = async (req, res) => {
  const id = req.params.newsId;
  const publishDate = new Date().getTime();
  try {
    const news = await News.findByPk(id);
    if (news.dataValues.published === true) {
      res.status(400).send({
        message: "News it's already published!",
      });
    } else {
      const miniature = await news.getMiniature();
      news.update({ published: true, publishDate });
      miniature.update({ published: true, publishDate });
      res.send({
        message: "News has been published!",
      });
    }
  } catch (error) {
    res.send({
      message: `News has not been published! ${error}`,
    });
  }
};

exports.getAllNewest = (req, res) => {
  const categoryId = req.params.categoryId;
  const query = new URLSearchParams(req.query).get("query");

  const where = { published: true };
  if (categoryId) {
    where.categoryId = categoryId;
  }
  if (query) {
    where.miniatureTitle = {
      [Op.like]: `%${query}%`,
    };
  }

  Minature.findAll({ where }, { order: [["publishDate", "DESC"]] })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send({
        message: `"An error occurred while trying to get! ${error}`,
      });
    });
};
