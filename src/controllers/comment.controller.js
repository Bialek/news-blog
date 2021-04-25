exports.getAllForNews = (req, res) => {
  const id = req.params.newsId;

  Comment.findAll().then((comments) => {
    res.send(comments);
  });
};
