const testeModel = require("../models").teste;

const controller = {
  getAllIntrebari: (req, res) => {
    res.status(200).send({ message: "totu ok la teste" });
  },
};

module.exports = controller;
