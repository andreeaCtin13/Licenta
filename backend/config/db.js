const Sequelize = require("sequelize");

const sequelize = new Sequelize("learnit", "root", "", {
  dialect: "mysql",
  logging: false,
  define: {
    timestamps: true,
    freezeTableName: true,
  },
});

sequelize
  .authenticate()
  .then(() => console.log("Success"))
  .catch((err) => console.log(err));
module.exports = sequelize;
