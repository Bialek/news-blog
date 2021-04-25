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
    subtitle: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.TEXT,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
    publishDate: {
      type: Sequelize.DATE,
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return News;
};
