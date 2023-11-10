const usersModel = require("../models").users;

const controller = {
  getAllUsers: (req, res) => {
    res.status(200).send({ message: "totu ok la users" });
  },
};

module.exports = controller;
