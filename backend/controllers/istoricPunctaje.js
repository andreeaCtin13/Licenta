const istoricuriPunctajeModel = require("../models").istoricuriPunctaje;
const testeModel = require("../models").teste;
const sectiuniModel = require("../models").sectiuni;
const controller = {
  getAllIstoricuriPunctaje: (req, res) => {
    res.status(200).send({ message: "totu ok la istoricuri punctaje" });
  },
  insertGrade: async (req, res) => {
    const { grade, id_test, id_utilizator } = req.body;
    let date = new Date();
    await istoricuriPunctajeModel
      .create({
        data_sustinere: date,
        id_utilizator,
        id_test,
        punctaj_obtinut: grade,
      })
      .then(() => {
        return res.status(200).json({
          message: "succes",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "server error",
          err: err,
        });
      });
  },
  getLastIstoricOfAUser: async (req, res) => {
    const { id_utilizator, id_sectiune } = req.params;

    const sectiune = sectiuniModel.findByPk(id_sectiune);
    if (!sectiune) {
      return res.status(400).json({
        message: "sectiune invalida",
      });
    }

    const test = await testeModel.findAll({
      where: {
        id_sectiune,
      },
    });

    console.log("Test", test);
    console.log("id_sect:", id_sectiune);
    if (!test || test.length === 0) {
      return res.status(400).json({ message: "test invalid" });
    }

    console.log("TEST", test);
    const id_test = test[0].id_test;
    const istoric = await istoricuriPunctajeModel.findAll({
      where: {
        id_utilizator,
        id_test,
      },
    });
    if (!istoric || istoric.length === 0) {
      return res.status(400).json({
        message: "nu exista istoric",
      });
    }
    return res
      .status(200)
      .json({ message: "ok", lastHistory: istoric[istoric.length - 1] });
  },
};

module.exports = controller;
