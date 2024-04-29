const ictoricCerinteModel = require("../models").istoricAssigments;
const cerinteModel = require("../models").assigment;
const sectiuniModel = require("../models").sectiuni;
const cursuriModel = require("../models").cursuri;
const multer = require("multer");

const controller = {
  getAllIstoricCerinte: async (req, res) => {
    const { id_utilizator, id_curs } = req.params;

    console.log("id_curs", id_curs);
    console.log("id_utilizator", id_utilizator);

    let curs = await cursuriModel.findByPk(id_curs);

    if (!curs) {
      return res.status(400).json({
        message: "nu ai introdus un id_curs valid",
      });
    }
    const sectiuni = await sectiuniModel.findAll({
      where: {
        id_curs,
      },
    });

    let cerinte = [];

    for (let sectiune of sectiuni) {
      let cerintePerSectiune = await cerinteModel.findAll({
        where: {
          id_sectiune: sectiune.id_sectiune,
        },
      });

      cerinte.push(...cerintePerSectiune);
    }

    let istoric = [];

    for (let cerinta of cerinte) {
      let assig = await ictoricCerinteModel.findAll({
        where: {
          id_cerinta: cerinta.id_cerinta,
          id_utilizator: id_utilizator,
        },
      });
      if (assig.length > 0) {
        istoric.push([...assig]);
      }
    }

    return res.status(200).json({
      istoric: istoric,
    });
  },
  uploadFile: async (req, res) => {
    if (req.file === undefined) {
      console.log("de ce intra aici?");
      return res.status(400).json({ message: "you should introduce a file" });
    }
    const { id_cerinta, id_utilizator } = req.params;
    const new_cerinta = {
      rezolvare: req.file.path,
      data_finalizare: new Date(),
      id_utilizator: id_utilizator,
      id_cerinta: id_cerinta,
    };
    console.log("ASTA INTRODUC IN BD ", new_cerinta);
    try {
      await ictoricCerinteModel
        .create(new_cerinta)
        .then(async () => {
          return res.status(200).send("A fost incarcata rezolvarea");
        })
        .catch((err) => {
          return res.status(500).json({ message: "eroare la update request" });
        });
    } catch (err) {
      return res.status(500).json({ message: "error" });
    }
  },
  getIstoricForOneAssigment: async (req, res) => {
    const { id_cerinta, id_utilizator } = req.body;

    try {
      const assigments = await requestModel.findAll({
        where: {
          id_cerinta,
          id_utilizator,
        },
      });
      if (!assigments) {
        return res.status(400).json({ error: "File Not Found" });
      }
      return res.status(200).send(assigments);
    } catch (err) {
      console.error("Error downloading file:", err);
      return res.status(500).send({ message: "Server ERROR", err: err });
    }
  },
};

module.exports = controller;
