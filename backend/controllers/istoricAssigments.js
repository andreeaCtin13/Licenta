const { Op, Sequelize } = require("sequelize");  // Import Sequelize operators and functions
const ictoricCerinteModel = require("../models").istoricAssigments;
const cerinteModel = require("../models").assigment;
const sectiuniModel = require("../models").sectiuni;
const cursuriModel = require("../models").cursuri;
const utilizatoriModel = require("../models").users;
const multer = require("multer");
const _ = require("lodash");
const { istoricAssigments } = require("../models");
const ExcelJS = require('exceljs');
const sequelize = require("../config/db");

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
  getRaportFeedback: async (req, res) => {
    try {
      const cursuri = await cursuriModel.findAll({ attributes: ['id_curs', 'denumire', 'id_utilizator'] });
      const cerinte = await cerinteModel.findAll({ attributes: ['id_cerinta', 'id_curs'] });
      const cerinteIstoric = await istoricAssigments.findAll();
      const utilizatori = await utilizatoriModel.findAll({ attributes: ['id_utilizator', 'nume'] });

      let reportData = [];

      cursuri.forEach(curs => {
          const cerinteForCurs = cerinte.filter(cerinta => cerinta.id_curs === curs.id_curs);
          const cerinteIstoricForCurs = cerinteIstoric.filter(ci =>
              cerinteForCurs.some(cerinta => cerinta.id_cerinta === ci.idCerinta)
          );

          const totalCerinte = cerinteIstoricForCurs.length;
          const feedbackGiven = cerinteIstoricForCurs.filter(ci => ci.feedback !== null).length;
          const feedbackGivenPercentage = totalCerinte ? (feedbackGiven / totalCerinte) * 100 : 0;
          const feedbackMissingPercentage = totalCerinte ? ((totalCerinte - feedbackGiven) / totalCerinte) * 100 : 0;

          const mentor = utilizatori.find(u => u.id_utilizator === curs.id_utilizator);

          reportData.push({
              idCurs: curs.id_curs,
              numeCurs: curs.denumire,
              numeMentor: mentor ? mentor.nume : 'N/A',
              feedbackGivenPercentage: feedbackGivenPercentage.toFixed(2),
              feedbackMissingPercentage: feedbackMissingPercentage.toFixed(2)
          });
      });

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Feedback Report');

      worksheet.columns = [
          { header: 'ID Curs', key: 'idCurs', width: 10 },
          { header: 'Nume Curs', key: 'numeCurs', width: 30 },
          { header: 'Nume Mentor', key: 'numeMentor', width: 30 },
          { header: 'Procent Feedback Dat', key: 'feedbackGivenPercentage', width: 20 },
          { header: 'Procent Feedback Lipsă', key: 'feedbackMissingPercentage', width: 20 }
      ];

      reportData.forEach(data => {
          worksheet.addRow(data);
      });

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=raport_feedback_cursuri.xlsx');

      await workbook.xlsx.write(res);
      res.end();
  } catch (error) {
      console.error('Error generating feedback report:', error);
      res.status(500).json({ error: 'Could not generate feedback report' });
  }
  }
};


module.exports = controller;

