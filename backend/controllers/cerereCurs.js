const cereriCursModel = require("../models").cereriCurs;
const cursuriModel = require("../models").cursuri;
const utilizatorModel = require("../models").users;
const { EqOp } = require("./Operators");

const controller = {
  getAllCereri: async (req, res) => {
    //with pagination
    const { id_utilizator, idCourse } = req.params;

    const filter = req.query;

    if (!filter.take) filter.take = 10;
    if (!filter.skip) filter.skip = 1;
    console.log("take: ", filter.take);
    console.log("skip: ", filter.skip);

    let whereClause = {};

    if (filter.status) {
      whereClause.status = { [EqOp]: filter.status };
    }

    let user = await utilizatorModel.findByPk(id_utilizator);
    if (!user) {
      return res.status(400).json({
        message: "Nu exista un user cu id-ul dat ca paametru in functie",
      });
    }
    console.log(idCourse);
    const curs = await cursuriModel.findByPk(idCourse);

    let requests = [];

    console.log("CURS", curs);

    if (curs) {
      await cereriCursModel
        .findAll({
          where: { ...whereClause, id_curs: idCourse },
          limit: parseInt(filter.take),
          offset: parseInt(filter.skip - 1) * parseInt(filter.take),
        })
        .then(async (rezultat) => {
          let reqs = [];
          for (let j = 0; j < rezultat.length; j++) {
            user = await utilizatorModel.findByPk(rezultat[j].id_utilizator);

            reqs.push({
              id_cerere: rezultat[j].id_cerere,
              id_curs: idCourse,
              id_utilizator: user.id_utilizator,
              denumire: curs.denumire,
              nume: user.nume,
              mail: user.mail,
            });
          }
          requests.push(...reqs);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send({ message: "server error", err: err });
        });
    } else {
      return res.status(400).send({ message: "nu ai trimis ce trebuia" });
    }

    return res
      .status(200)
      .json({ requests: requests, number_of_req: requests.length });
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
        await cerere.update({ status: status });
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
