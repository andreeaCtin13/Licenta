const Sequelize = require("sequelize");

const sequelize = new Sequelize("learnIT", "root", "", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
