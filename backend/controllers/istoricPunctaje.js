const istoricuriPunctajeModel = require("../models").istoricuriPunctaje;
const testeModel = require("../models").teste;
const sectiuniModel = require("../models").sectiuni;
const utilizatoriModel = require("../models").users;

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

    if (!test || test.length === 0) {
      return res.status(400).json({ message: "test invalid" });
    }

    console.log("test", test);

    const id_test = test[0].id_test;
    const istoric = await istoricuriPunctajeModel.findAll({
      where: {
        id_utilizator,
        id_test,
      },
    });
    if (!istoric || istoric.length === 0) {
      return res.status(200).json({
        message: "nu exista istoric",
      });
    }
    return res.status(200).json({
      message: "ok",
      lastHistory: {
        istoric: istoric[istoric.length - 1],
        punctaj_minim_promovare: test[0].punctaj_minim_promovare,
      },
    });
  },
  getIstoricPunctajeOfAUser: async (req, res) => {
    const { id_utilizator } = req.params;

    let user = await utilizatoriModel.findByPk(id_utilizator);
    if (!user) {
      return res.status(400).json({
        message: "nu exista utilizator cu id-ul mentionat",
      });
    }

    let istoric = await istoricuriPunctajeModel.findAll({
      where: {
        id_utilizator: id_utilizator,
      },
    });

    const luniInRomana = {
      0: "ianuarie",
      1: "februarie",
      2: "martie",
      3: "aprilie",
      4: "mai",
      5: "iunie",
      6: "iulie",
      7: "august",
      8: "septembrie",
      9: "octombrie",
      10: "noiembrie",
      11: "decembrie",
    };

    const numarTestePeLuni = {};

    istoric.forEach((punctaj) => {
      const data = new Date(punctaj.data_sustinere);
      const luna = luniInRomana[data.getMonth()];
      if (!numarTestePeLuni[luna]) {
        numarTestePeLuni[luna] = 1;
      } else {
        numarTestePeLuni[luna]++;
      }
    });

    return res.status(200).json({
      numarTestePeLuni: numarTestePeLuni,
      message: "Succes",
    });
  },
};

module.exports = controller;
