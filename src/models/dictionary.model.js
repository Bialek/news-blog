module.exports = (sequelize, Sequelize) => {
  const Dictionary = sequelize.define("dictionary", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
  });

  return Dictionary;
};
