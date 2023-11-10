const resurseModel = require("../models").resurse;

const controller = {
  getAllResurse: (req, res) => {
    res.status(200).send({ message: "totu ok la resurse" });
  },
};

module.exports = controller;
