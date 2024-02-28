const resurseModel = require("../models").resurse;
const sectiuniModel = require("../models").sectiuni;

const controller = {
  getAllResurse: (req, res) => {
    res.status(200).send({ message: "totu ok la resurse" });
  },
  insertResursa: async (req, res) => {
    const { tip_resursa, link_resursa, titlu_resursa, id_sectiune } = req.body;
    let sectiune = await sectiuniModel.findByPk(id_sectiune);
    if (!sectiune) {
      return res
        .status(400)
        .json({ message: "nu exista sectiunea pentru care este testul" });
    }

    await resurseModel
      .create({
        tip_resursa,
        link_resursa,
        titlu_resursa,
        id_sectiune,
      })
      .then((rez) => {
        return res.status(200).json({ resursa: rez, message: "success" });
      })
      .catch((err) => {
        return res.status(500).json({ error: err, message: "server error" });
      });
  },
};

module.exports = controller;
