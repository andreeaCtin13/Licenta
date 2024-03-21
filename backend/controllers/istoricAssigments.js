const ictoricCerinteModel = require("../models").istoricAssigments;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, `${file.originalname}-${uniqueSuffix}`);
  },
});

const controller = {
  getAllIstoricCerinte: (req, res) => {
    res.status(200).send({ message: "totu ok la istoricuri punctaje" });
  },
  uploadFile: async (req, res) => {
    if (req.file === undefined) {
      console.log("de ce intra aici?");
      return res.status(400).json({ message: "you should introduce a file" });
    }
    const { id_cerinta, id_utilizator } = req.params;
    const new_cerinta = {
      rezolvare: req.file.path,
      data_finalizare: new Date(),
      id_utilizator: id_utilizator,
      id_cerinta: id_cerinta,
    };
    console.log("ASTA INTRODUC IN BD ", new_cerinta);
    try {
      await ictoricCerinteModel
        .create(new_cerinta)
        .then(async () => {
          return res.status(200).send("A fost incarcata rezolvarea");
        })
        .catch((err) => {
          console.log("sar aci");

          return res.status(500).json({ message: "eroare la update request" });
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
};

module.exports = controller;
