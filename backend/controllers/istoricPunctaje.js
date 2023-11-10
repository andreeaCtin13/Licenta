const istoricuriPunctajeModel = require("../models").istoricuriPunctaje;

const controller = {
  getAllIstoricuriPunctaje: (req, res) => {
    res.status(200).send({ message: "totu ok la istoricuri punctaje" });
  },
};

module.exports = controller;
