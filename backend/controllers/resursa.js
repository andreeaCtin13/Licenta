const resurseModel = require("../models").resurse;
const sectiuniModel = require("../models").sectiuni;

const controller = {
  getAllResurse: async (req, res) => {
    const { id_sectiune } = req.params;
    console.log(id_sectiune);
    await resurseModel
      .findAll({
        where: {
          id_sectiune,
        },
      })
      .then((rez) => {
        if (!rez) {
          return res.status(200).json({
            message: "Nu au fost incarcate inca resurse pentru acest curs",
          });
        } else {
          console.log(rez);
          return res.status(200).json({
            resurse: rez,
            message: "success",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({ message: "server error" });
      });
  },
  insertResursa: async (req, res) => {
    let { tip_resursa, link_resursa, titlu_resursa, id_sectiune } = req.body;
    let sectiune = await sectiuniModel.findByPk(id_sectiune);
    if (!sectiune) {
      return res
        .status(400)
        .json({ message: "nu exista sectiunea pentru care este testul" });
    }

    if (tip_resursa === "pdf_path") {
      const files = req.files;

      for (let file of files) {
        link_resursa = file?.path;
        titlu_resursa = file?.originalname;

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
            return res
              .status(500)
              .json({ error: err, message: "server error" });
          });
      }
      return res.status(200).json({
        message: "ok",
      });
    } else {
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
    }
  },
};

module.exports = controller;
