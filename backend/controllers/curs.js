const cursuriModel = require("../models").cursuri;

const controller = {
  getAllCursuri: (req, res) => {
    res.status(200).send({ message: "totu ok la cursuri" });
  },
};

module.exports = controller;
