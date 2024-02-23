const usersModel = require("../models").users;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "2h" });
};

const controller = {
  getAllUsers: async (req, res) => {
    const filter = req.query;
    if (!filter.take) filter.take = 10;

    if (!filter.skip) filter.skip = 1;

    let whereClause = {};
    if (filter.nume) whereClause.nume = { [LikeOp]: `%${filter.nume}%` };

    await usersModel
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
  login: async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    console.log(req.body);

    const user = await usersModel.findOne({ where: { mail: mail } });
    console.log(user);
    if (user) {
      const password_valid = await bcrypt.compare(password, user.password);
      console.log(password_valid);
      if (password_valid) {
        const jwtToken = generateAccessToken(user);
        return res.status(200).send({ user, jwtToken });
      } else {
        return res.status(400).send({ error: "Password Incorrect" });
      }
    } else {
      return res.status(404).send({ error: "User does not exist" });
    }
  },
  register: async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    const status = req.body.status;
    const nume = req.body.nume;

    try {
      let user = usersModel.findOne({ where: { mail: mail } });
      if (user) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await usersModel.create({
          mail,
          password: hashedPassword,
          status,
          nume,
        });
        const jwtToken = generateAccessToken(user);

        return res.status(200).send({ user, jwtToken });
      } else {
        return res.status(409).send({ message: "user deja existent" });
      }
    } catch (e) {
      console.log(e);
    }
  },
  deleteUser: async (req, res) => {
    let id = req.body.id_utilizator;
    await usersModel
      .destroy({
        where: { id_utilizator: id },
      })
      .then(() => {
        return res.status(200).send({ message: "a fost sters" });
      })
      .catch((err) => {
        return res.status(500).send({ error: err });
      });
  },
  actualizareUser: async (req, res) => {
    const id_utilizator = req.body.id_utilizator;
    const mail = req.body.mail;
    const password = req.body.password;
    const status = req.body.status;
    const nume = req.body.nume;

    await usersModel
      .update(
        {
          mail,
          nume,
          status,
          password,
        },
        {
          where: {
            id_utilizator: id_utilizator,
          },
        }
      )
      .then((rez) => {
        return res
          .status(200)
          .send({ message: "A fost actualizat utilizatorul" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "A aparut o eroare la actualizarea utilizatorului",
          err: err,
        });
      });
  },
};

module.exports = controller;
