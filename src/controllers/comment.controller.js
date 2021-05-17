const db = require("../models");
const News = db.news;
const Comment = db.comment;

exports.getAllForNews = (req, res) => {
  const id = req.params.newsId;
  News.findByPk(id).then(async (news) => {
    if (news.getComments) {
      const comments = await news.getComments();
      res.send(comments);
    } else {
      res.status(200).send([]);
    }
  });
};

exports.create = async (req, res) => {
  console.log(req);
  const id = req.params.newsId;

  try {
    const newComment = await Comment.create(req.body);
    const news = await News.findByPk(id);
    news.addComment(newComment);

    res.status(200).send({
      message: "Comment has been creted!",
    });
  } catch (err) {
    res.status(500).send({
      message: err.mesage || "An error occurred while trying to create",
    });
  }
};
