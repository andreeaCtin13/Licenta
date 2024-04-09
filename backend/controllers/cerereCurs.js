const cereriCursModel = require("../models").cereriCurs;
const cursuriModel = require("../models").cursuri;
const utilizatorModel = require("../models").users;

const controller = {
  getAllCereri: (req, res) => {
    res.status(200).send({ message: "totu ok la cereri cursuri" });
  },

  insertCerereCurs: async (req, res) => {
    const { id_utilizator, id_curs } = req.body;
    const user = await utilizatorModel.findByPk(id_utilizator);
    const curs = await cursuriModel.findByPk(id_curs);
    if (user && curs && user.status === "junior") {
      const findOne = await cereriCursModel.findOne({
        where: {
          id_utilizator,
          id_curs,
        },
      });

      if (findOne == null) {
        await cereriCursModel
          .create({ id_utilizator, id_curs })
          .then(() => {
            return res.status(200).json({ message: "succes" });
          })
          .catch((err) => {
            return res
              .status(500)
              .json({ message: "server error", err: err.message });
          });
      } else {
        return res.status(400).json({ message: "exista deja cererea" });
      }
    } else {
      return res.status(400).json({ message: "nu ai frunizat date corecte" });
    }
  },

  verifyIfRequestExists: async (req, res) => {
    const { id_curs, id_utilizator } = req.body;
    console.log(id_curs, id_utilizator);
    await cereriCursModel
      .findAll({
        where: {
          id_curs: id_curs,
          id_utilizator: id_utilizator,
        },
      })
      .then((rez) => {
        if (rez.length == 0) {
          return res.status(400).json({ message: "nope" });
        } else {
          return res.status(200).json({ message: "exists" });
        }
      })
      .catch((err) => {
        return res.status(200).json({ message: "nope" });
      });
  },
  getAllCursuriAcceptedOrNotOfAUser: async (req, res) => {
    const id_utilizator = req.params.id;

    const user = await utilizatorModel.findByPk(id_utilizator);
    if (!user) {
      return res
        .status(400)
        .json({ message: "nu exista un utilizator cu respectivul id" });
    }
    await cereriCursModel
      .findAll({
        where: { id_utilizator: id_utilizator },
      })
      .then((rez) => {
        if (rez) {
          return res.status(200).json({ message: "succes", rezultat: rez });
        } else {
          return res.status(400).json({
            message: "utilizatorul nu e inscris la niciun curs momentan",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "error", err: err.message });
      });
  },

  getCursuriOfAUser: async (req, res) => {
    const id_utilizator = req.params.id;

    const user = await utilizatorModel.findByPk(id_utilizator);
    if (!user) {
      return res
        .status(400)
        .json({ message: "nu exista un utilizator cu respectivul id" });
    }
    await cereriCursModel
      .findAll({
        where: { id_utilizator: id_utilizator, status: "accepted" },
      })
      .then((rez) => {
        if (rez) {
          return res.status(200).json({ message: "succes", rezultat: rez });
        } else {
          return res.status(400).json({
            message: "utilizatorul nu e inscris la niciun curs momentan",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "error", err: err.message });
      });
  },

  updateCerereCurs: async (req, res) => {
    const id_cerere = req.params.id;
    const status = req.body.status;

    const cerere = await cereriCursModel.findByPk(id_cerere);
    if (!cerere) {
      return res.status(400).json({ message: "Cererea nu există" });
    } else {
      try {
        await cerere.update({ status: status }); // Assuming you want to update the status to "accepted"
        return res
          .status(200)
          .json({ message: "Cererea a fost actualizată cu succes" });
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Eroare internă a serverului", err: err });
      }
    }
  },
};
module.exports = controller;
