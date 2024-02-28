const assigmentModel = require("../models").assigment;
const sectiuniModel = require("../models").sectiuni;

const controller = {
  getAllAssigments: (req, res) => {
    res.status(200).send({ message: "totu ok la assigments uri" });
  },
  insertAssigment: async (req, res) => {
    const { titlu, cerinta, id_sectiune } = req.body;
    let sectiune = await sectiuniModel.findByPk(id_sectiune);
    if (!sectiune) {
      return res
        .status(400)
        .json({ message: "nu exista sectiunea pentru care este testul" });
    }
    await assigmentModel
      .create({
        titlu,
        cerinta,
        id_sectiune,
      })
      .then((rez) => {
        return res.status(200).json({ cerinta: rez, message: "success" });
      })
      .catch((err) => {
        return res.status(500).json({ error: err, message: "server error" });
      });
  },
};

module.exports = controller;
