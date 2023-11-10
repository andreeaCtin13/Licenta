const cereriCursModel = require("../models").cereriCurs;

const controller = {
  getAllCereri: (req, res) => {
    res.status(200).send({ message: "totu ok la cereri cursuri" });
  },
};

module.exports = controller;
