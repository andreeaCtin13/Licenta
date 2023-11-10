const sectiuniModel = require("../models").sectiuni;

const controller = {
  getAllSectiuni: (req, res) => {
    res.status(200).send({ message: "totu ok la sectiuni" });
  },
};

module.exports = controller;
