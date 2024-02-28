const testeModel = require("../models").teste;
const sectiuniModel = require("../models").sectiuni;

const controller = {
  getAllIntrebari: (req, res) => {
    res.status(200).send({ message: "totu ok la teste" });
  },
  insertTest: async (req, res) => {
    const { punctaj_minim_promovare, numar_intrebari, id_sectiune } = req.body;

    let sectiune = await sectiuniModel.findByPk(id_sectiune);
    if (!sectiune) {
      return res
        .status(400)
        .json({ message: "nu exista sectiunea pentru care este testul" });
    }
    await testeModel
      .create({
        punctaj_minim_promovare,
        numar_intrebari,
        id_sectiune,
      })
      .then((rez) => {
        return res.status(200).json({ test: rez, message: "success" });
      })
      .catch((err) => {
        return res.status(500).json({ error: err, message: "server error" });
      });
  },
};

module.exports = controller;
