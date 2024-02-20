const Sequelize = require("sequelize");
const env = require("dotenv");
env.config();

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

sequelize
  .authenticate()
  .then(() => console.log("Success"))
  .catch((err) => console.log(err));
module.exports = sequelize;
