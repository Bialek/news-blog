const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.news = require("./news.model")(sequelize, Sequelize);
db.miniature = require("./miniature.model")(sequelize, Sequelize);
// db.comment = require("./comment.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});
db.user.hasMany(db.news);
db.news.belongsTo(db.user, {
  foreignKey: "authorId",
});
db.user.hasMany(db.miniature);
db.miniature.belongsTo(db.user, {
  foreignKey: "authorId",
});

db.news.hasOne(db.miniature, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.miniature.belongsTo(db.news);

db.ROLES = ["user", "admin"];

module.exports = db;
