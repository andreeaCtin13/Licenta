const ictoricCerinteModel = require("../models").istoricAssigments;
const cerinteModel = require("../models").assigment;
const sectiuniModel = require("../models").sectiuni;
const cursuriModel = require("../models").cursuri;
const utilizatoriModel = require("../models").users;
const multer = require("multer");

const controller = {
  getAllIstoricCerinte: async (req, res) => {
    const { id_curs, id_cerinta } = req.params;
    const filter = req.query;
    if (!filter.take) filter.take = 10;

    if (!filter.skip) filter.skip = 1;
    let curs = await cursuriModel.findByPk(id_curs);

    if (!curs) {
      return res.status(400).json({
        message: "nu ai introdus un id_curs valid",
      });
    }

    await ictoricCerinteModel
      .findAndCountAll({
        where: {
          id_cerinta: id_cerinta,
        },
        limit: parseInt(filter.take),
        offset: parseInt(filter.skip - 1) * parseInt(filter.take),
      })
      .then(async (rez) => {
        let as = [];
        for (let x of rez.rows) {
          let user = await utilizatoriModel.findByPk(x.id_utilizator);
          as.push({
            id_cerinta_istoric: x.id_cerinta_istoric,
            data_finalizare: x.data_finalizare,
            rezolvare: x.rezolvare,
            feedback: x.feedback,
            id_utilizator: x.id_utilizator,
            id_cerinta: x.id_cerinta,
            mail: user.mail,
            nume: user.nume,
          });
        }
        return res.status(200).json({
          istoric: as,
          count: rez.count,
        });
      });
  },
  uploadFile: async (req, res) => {
    if (req.file === undefined) {
      return res.status(400).json({ message: "you should introduce a file" });
    }
    const { id_cerinta, id_utilizator } = req.params;
    const new_cerinta = {
      rezolvare: req.file.path,
      data_finalizare: new Date(),
      id_utilizator: id_utilizator,
      id_cerinta: id_cerinta,
    };
    try {
      await ictoricCerinteModel
        .create(new_cerinta)
        .then(async () => {
          return res.status(200).send("A fost incarcata rezolvarea");
        })
        .catch((err) => {
          return res
            .status(500)
            .json({ message: "eroare la update request", err: err });
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
  updateIstoricAssigment: async (req, res) => {
    const { id_cerinta_istoric } = req.params;
    const { feedback } = req.body;
    ictoricCerinteModel
      .update(
        { feedback },
        {
          where: {
            id_cerinta_istoric,
          },
        }
      )
      .then(() => {
        return res.status(200).json({
          message: "succes",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "failed",
          err: err,
        });
      });
  },
};

module.exports = controller;
