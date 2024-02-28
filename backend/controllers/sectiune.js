const sectiuniModel = require("../models").sectiuni;
const cursuriModel = require("../models").cursuri;

const controller = {
  getAllSectiuni: async (req, res) => {
    const { id_curs } = req.params;

    try {
      let sectiuni = await sectiuniModel.findAll({ where: { id_curs } });
      return res.status(200).json({ sectiuni: sectiuni, message: "succes" });
    } catch (err) {
      return res.status(500).json({ message: "server error", err: err });
    }
  },
  insertSectiune: async (req, res) => {
    const { denumire, descriere, id_curs } = req.body;

    try {
      let curs = await cursuriModel.findByPk(id_curs);
      if (!curs) {
        return res
          .status(400)
          .json({ message: "nu exista curs cu id ul respectiv" });
      } else {
        await sectiuniModel
          .create({
            denumire,
            descriere,
            id_curs,
          })
          .then((rez) => {
            return res
              .status(200)
              .json({ sectiune: rez, message: "successful" });
          });
      }
    } catch (err) {
      return res.status(500).json({ message: "server error" });
    }
  },
};

module.exports = controller;
