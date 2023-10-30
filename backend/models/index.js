const db = require("../config/db");
const users = require("./user");
module.exports = {
  users,
  connection: db,
};
