module.exports = (sequelize, Sequelize) => {
  const News = sequelize.define("news", {
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
    content: {
      type: Sequelize.TEXT,
    },
    author: {
      type: Sequelize.STRING,
    },
    isPublish: {
      type: Sequelize.BOOLEAN,
    },
    publishDate: {
      type: Sequelize.DATE,
    },
  });

  return News;
};