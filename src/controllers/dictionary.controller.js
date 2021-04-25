const db = require("../models");
const Dictionary = db.dictionary;

exports.getAll = (req, res) => {
  Dictionary.findAll().then((dictionary) => {
    res.send(dictionary);
  });
};
