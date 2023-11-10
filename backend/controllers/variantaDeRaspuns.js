const varianteDeRaspunsModel = require("../models").varianteDeRaspuns;

const controller = {
  getAllVarianteDeRaspuns: (req, res) => {
    res.status(200).send({ message: "totu ok la variante de raspuns" });
  },
};

module.exports = controller;
