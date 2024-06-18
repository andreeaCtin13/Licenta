const { Op, Sequelize } = require("sequelize");  // Import Sequelize operators and functions
const ictoricCerinteModel = require("../models").istoricAssigments;
const cerinteModel = require("../models").assigment;
const sectiuniModel = require("../models").sectiuni;
const cursuriModel = require("../models").cursuri;
const utilizatoriModel = require("../models").users;
const multer = require("multer");
const _ = require("lodash");

const controller = {
  getAllIstoricCerinte: async (req, res) => {
    const { id_curs, id_cerinta } = req.params;

    try {
      const utilizatoriCuIstoric = await ictoricCerinteModel.findAll({
        attributes: ['id_utilizator'],
        where: {
          id_cerinta: id_cerinta
        },
        group: ['id_utilizator']
      });

      const result = [];

      for (let i = 0; i < utilizatoriCuIstoric.length; i++) {
        const id_utilizator = utilizatoriCuIstoric[i].id_utilizator;

        const recentIstoric = await ictoricCerinteModel.findOne({
          where: {
            id_utilizator: id_utilizator,
            id_cerinta: id_cerinta,
          },
          order: [["data_finalizare", "DESC"]],
        });

        if (recentIstoric) {
          const user = await utilizatoriModel.findByPk(id_utilizator);

          const istoricUtilizator = {
            id_cerinta_istoric: recentIstoric.id_cerinta_istoric,
            data_finalizare: recentIstoric.data_finalizare,
            rezolvare: recentIstoric.rezolvare,
            feedback: recentIstoric.feedback,
            id_utilizator: recentIstoric.id_utilizator,
            id_cerinta: recentIstoric.id_cerinta,
            mail: user ? user.mail : null,
            nume: user ? user.nume : null,
          };

          result.push(istoricUtilizator);
        }
      }

      return res.status(200).json({
        istoric: result,
        count: result.length,
      });

    } catch (err) {
      console.error("Eroare la preluarea istoricului de cerințe:", err);
      return res.status(500).json({ message: "Eroare server", err: err });
    }
  },
  getIstoricRezolvariPerUser: async (req, res) => {
    const { id_utilizator } = req.params;

    let user = await utilizatoriModel.findByPk(id_utilizator);
    if (!user) {
      return res.status(400).json({
        message: "nu exista utilizator cu id-ul mentionat",
      });
    }

    let istoric = await ictoricCerinteModel.findAll({
      where: {
        id_utilizator: id_utilizator,
      },
      order: [["data_finalizare", "ASC"]],
    });

    const luniInRomana = {
      1: "ianuarie",
      2: "februarie",
      3: "martie",
      4: "aprilie",
      5: "mai",
      6: "iunie",
      7: "iulie",
      8: "august",
      9: "septembrie",
      10: "octombrie",
      11: "noiembrie",
      12: "decembrie",
    };

    const istoricGrupatPeLuni = _.groupBy(istoric, (rezolvare) => {
      const data = new Date(rezolvare.data_finalizare);
      const monthName = luniInRomana[data.getMonth() + 1];
      return monthName;
    });

    const numarRezolvariPeLuni = {};
    for (const [luna, rezolvari] of Object.entries(istoricGrupatPeLuni)) {
      numarRezolvariPeLuni[luna] = rezolvari.length;
    }

    return res.status(200).json({
      istoric: numarRezolvariPeLuni,
      message: "Succes",
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
  getLastFeedback: async (req, res) => {
    const { id_utilizator, id_cerinta } = req.params;

    try {
      const lastFeedback = await ictoricCerinteModel.findOne({
        where: {
          id_utilizator: id_utilizator,
          id_cerinta: id_cerinta,
        },
        order: [["data_finalizare", "DESC"]],
        attributes: ["feedback"],
      });

      if (!lastFeedback) {
        return res.status(404).json({ message: "No feedback found" });
      }

      return res.status(200).json({
        feedback: lastFeedback.feedback,
        message: "Success",
      });
    } catch (err) {
      console.error("Error fetching last feedback:", err);
      return res.status(500).json({ message: "Server error", err: err });
    }
  },
};

module.exports = controller;
