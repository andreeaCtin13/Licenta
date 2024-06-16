const assigmentModel = require("../models").assigment;
const istoricCerinteModel = require("../models").istoricAssigments;
const sectiuniModel = require("../models").sectiuni;

const controller = {
  getAllAssigments: async (req, res) => {
    const { id_sectiune } = req.params;
    console.log(id_sectiune);
    try {
      const cerinte = await assigmentModel.findAll({
        where: {
          id_sectiune: id_sectiune,
        },
      });
      return res.status(200).json({ message: "success", cerinte: cerinte });
    } catch (err) {
      return res.status(500).json({ message: "server error", error: err });
    }
  },

  insertAssigment: async (req, res) => {
    const { titlu, cerinta, id_sectiune } = req.body;

    try {
      let sectiune = await sectiuniModel.findByPk(id_sectiune);
      if (!sectiune) {
        return res.status(400).json({ message: "Nu există secțiunea pentru care este cerința" });
      }

      const newAssigment = await assigmentModel.create({
        titlu,
        cerinta,
        id_sectiune,
      });

      return res.status(200).json({ cerinta: newAssigment, message: "Success" });
    } catch (err) {
      return res.status(500).json({ error: err, message: "Server error" });
    }
  },

  deleteAssigment: async (req, res) => {
    const { id_cerinta } = req.params; // Utilizează id_cerinta pentru identificarea cerinței

    try {
      const cerinta = await assigmentModel.findByPk(id_cerinta);
      if (!cerinta) {
        return res.status(404).json({ message: "Cerinta nu există" });
      }

      await istoricCerinteModel.destroy({
        where: {
          id_cerinta: id_cerinta,
        },
      });

      await assigmentModel.destroy({
        where: {
          id_cerinta: id_cerinta,
        },
      });

      return res.status(200).json({ message: "Cerinta și istoricul ei au fost șterse cu succes" });
    } catch (err) {
      console.error("Error deleting assignment:", err); // Loghează eroarea pentru diagnosticare

      return res.status(500).json({ message: "Eroare la ștergerea cerinței", error: err });
    }
  },
};

module.exports = controller;
