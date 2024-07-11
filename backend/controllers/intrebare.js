const intrebariModel = require("../models").intrebari;
const testModel = require("../models").teste;
const varianteModel = require("../models").varianteDeRaspuns;
const controller = {
  getAllIntrebariByTestId: async (req, res) => {
    const { id_test } = req.params;
    console.log("id_test",id_test)
    const test = await testModel.findByPk(id_test);
    if (!test) {
      return res
        .status(400)
        .json({ message: "nu exista test cu id-ul respectiv" });
    }
    console.log(id_test);
    await intrebariModel
      .findAll({
        where: {
          id_test,
        },
        include: [
          {
            model: varianteModel,
            as: "varianteDeRaspuns",
          },
        ],
      })
      .then((rez) => {
        console.log("REZULTAT: ", rez)
        if (rez && rez.length > 0) {
          return res.status(200).json({ message: "success", intrebari: rez });
        } else {
          return res
            .status(400)
            .json({ message: "nu exista intrebari pentru testul respectiv" });
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: "server error" });
      });
  },

  insertIntrebare: async (req, res) => {
    const { text_intrebare, id_test, punctaj_intrebare } = req.body;
    let test = await testModel.findByPk(id_test);

    if (test) {
      await intrebariModel
        .create({ text_intrebare, punctaj_intrebare, id_test })
        .then(() => {
          return res.status(200).json({ message: "success" });
        })
        .catch((err) => {
          return res.status(500).json({ error: err, message: "server error" });
        });
    } else {
      return res
        .status(400)
        .json({ message: "nu exista test cu id-ul respectiv" });
    }
  },
};

module.exports = controller;
