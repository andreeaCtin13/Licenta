const ictoricCerinteModel = require("../models").istoricAssigments;

const controller = {
  getAllIstoricCerinte: (req, res) => {
    res.status(200).send({ message: "totu ok la istoricuri punctaje" });
  },
};

module.exports = controller;
