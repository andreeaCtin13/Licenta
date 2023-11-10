const intrebariModel = require("../models").intrebari;

const controller = {
  getAllIntrebari: (req, res) => {
    res.status(200).send({ message: "totu ok la intrebari" });
  },
};

module.exports = controller;
