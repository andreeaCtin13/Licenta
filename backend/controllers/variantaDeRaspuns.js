const varianteDeRaspunsModel = require("../models").varianteDeRaspuns;
const intrebareModel = require("../models").intrebari;
const controller = {
  insertVarianta: async (req, res) => {
    const { id_intrebare, text_varianta, este_corecta } = req.body;

    const intrebare = await intrebareModel.findByPk(id_intrebare);
    if (!intrebare) {
      return res
        .status(400)
        .json({ message: "nu ai introdus un id valid pentru intrebare" });
    }
    await varianteDeRaspunsModel
      .create({
        id_intrebare,
        text_varianta,
        este_corecta,
      })
      .then(() => {
        return res.status(200).json({ message: "succes" });
      })
      .catch((err) => {
        return res.status(500).json({ message: "server error", err: err });
      });
  },
  getAllVarianteDeRaspuns: (req, res) => {
    res.status(200).send({ message: "totu ok la variante de raspuns" });
  },
};

module.exports = controller;
