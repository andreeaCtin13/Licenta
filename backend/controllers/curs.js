const cursuriModel = require("../models").cursuri;
const usersModel = require("../models").users;

const controller = {
  getAllCursuri: async (req, res) => {
    const filter = req.query;
    if (!filter.take) filter.take = 10;

    if (!filter.skip) filter.skip = 1;

    let whereClause = {};
    if (filter.denumire)
      whereClause.denumire = { [LikeOp]: `%${filter.denumire}%` };

    await cursuriModel
      .findAndCountAll({
        where: { ...whereClause },
        limit: parseInt(filter.take),
        offset: parseInt(filter.skip - 1) * parseInt(filter.take),
      })
      .then((rezultat) => {
        return res.status(200).send({ requests: rezultat });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ message: "server error", err: err });
      });
  },
  insertCurs: async (req, res) => {
    let {
      denumire,
      descriere,
      nr_sectiuni,
      imagine_reprezentativa,
      id_utilizator,
    } = req.body;

    try {
      let user = await usersModel.findByPk(id_utilizator);
      if (!user) {
        return res
          .status(400)
          .json({ message: "user associated does not exist" });
      }
      console.log("user found: ", user);
      if (user.status !== "mentor") {
        return res.status(400).json({ message: "wrong data provided" });
      }
    } catch (err) {
      return res.status(500).json({ message: "server error", err: err });
    }

    nr_sectiuni = nr_sectiuni ? nr_sectiuni : 0;
    await cursuriModel
      .create({
        denumire,
        descriere,
        nr_sectiuni,
        imagine_reprezentativa,
        id_utilizator,
      })
      .then((rez) => {
        return res.status(200).json({ user: rez, message: "course created" });
      })
      .catch((err) => {
        return res.status(500).json({ message: "server error", err: err });
      });
  },
  getCursById: async (req, res) => {
    const id_curs = req.params.id_curs;
    let curs = await cursuriModel.findByPk(id_curs);
    if (!curs) {
      return res
        .status(400)
        .json({ message: "nu exista curs cu id-ul respectiv" });
    } else {
      return res.status(200).json({
        curs,
        message: "success",
      });
    }
  },
};

module.exports = controller;
