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
    let { tip_resursa, id_sectiune } = req.body;
    let sectiune = await sectiuniModel.findByPk(id_sectiune);
    if (!sectiune) {
      return res
        .status(400)
        .json({ message: "nu exista sectiunea pentru care este testul" });
    }

    if (tip_resursa === "pdf_path" && req.files && req.files.length > 0) {
      const file = req.files[0]; // assuming only one file is uploaded
      const link_resursa = file.path;
      const titlu_resursa = file.originalname;

      console.log("Link Resursa:", link_resursa);
      console.log("Titlu Resursa:", titlu_resursa);

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
    } else {
      return res
        .status(400)
        .json({ message: "No files uploaded or wrong resource type" });
    }
  },
  deleteResursa: async (req, res) => {
    const { id } = req.params;

    await resurseModel
      .destroy({
        where: {
          id_resursa: id,
        },
      })
      .then(() => {
        return res.status(200).json({
          message: "Resource deleted successfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: err,
          message: "Failed to delete resource",
        });
      });
  },

  downloadPDF: async (req, res) => {
    const { id } = req.params;
    await resurseModel
      .findByPk(id)
      .then((resursa) => {
        if (!resursa) {
          return res.status(404).json({ message: "Resource not found" });
        }
        const filePath = resursa.link_resursa;
        res.download(filePath, (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to download file" });
          }
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
      });
  },
};

module.exports = controller;
