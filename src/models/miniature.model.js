module.exports = (sequelize, Sequelize) => {
  const Miniature = sequelize.define("miniature", {
    miniatureId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    miniatureTitle: {
      type: Sequelize.STRING,
    },
    miniatureSubtitle: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    publishDate: {
      type: Sequelize.DATE,
    },
    miniatureColor: {
      type: Sequelize.STRING,
    },
    miniatureIsVertical: {
      type: Sequelize.BOOLEAN,
    },
    miniatureSize: {
      type: Sequelize.INTEGER(10),
    },
    miniatureContent: {
      type: Sequelize.TEXT(512),
    },
  });

  return Miniature;
};
