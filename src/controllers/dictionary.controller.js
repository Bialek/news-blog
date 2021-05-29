const db = require("../models");
const Dictionary = db.dictionary;

exports.getAll = (req, res) => {
  Dictionary.findAll().then((dictionary) => {
    dictionary.sort((a, b) => a.id - b.id);
    res.send(dictionary);
  });
};

exports.create = (req, res) => {
  Dictionary.create(req.body)
    .then(() => {
      res.status(200).send({
        message: "Dictionary has been creted!",
      });
    })
    .catch(() => {
      res.status(500).send({
        message: err.mesage || "An error occurred while trying to create",
      });
    });
};

exports.update = (req, res) => {
  const id = req.body.id;
  Dictionary.update(
    req.body,
    {
      where: { id },
    },
    { multi: true }
  )
    .then((num) => {
      if (num[0] === 1) {
        res.send({
          message: "Dictionary has been saved!",
        });
      } else {
        res.send({
          message: `You cannot edit the dictionary about o id=${id}. It is possible that it cannot be found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "An error occurred while trying to edit the dictionary",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.dictionaryId;
  Dictionary.destroy({
    where: { id },
  })
    .then((num) => {
      if (num === 1) {
        res.send({
          message: "Dictionary has been removed!",
        });
      } else {
        res.send({
          message: `It is not possible to delete the dictionary id=${id}. It is possible that it cannot be found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err || "An error occurred while trying to delete the dictionary",
      });
    });
};
