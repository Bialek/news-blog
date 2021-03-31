module.exports = (sequelize, Sequelize) => {
  const Miniature = sequelize.define("miniature", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    header: {
      type: Sequelize.STRING,
    },
    isPublish: {
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
  });

  return Miniature;
};
