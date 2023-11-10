const assigmentModel = require("../models").assigment;

const controller = {
  getAllAssigments: (req, res) => {
    res.status(200).send({ message: "totu ok la assigments uri" });
  },
};

module.exports = controller;
