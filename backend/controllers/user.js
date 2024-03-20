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
    console.log("ajunge unde trebuie");
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
    console.log(req.body);
    const mail = req.body.mail;
    const password = req.body.password;
    const user = await usersModel.findOne({ where: { mail: mail } });
    if (user) {
      const password_valid = await bcrypt.compare(password, user.password);
      if (password_valid) {
        const jwtToken = generateAccessToken(user);
        return res.status(200).json({ user, jwtToken });
      } else {
        return res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      return res.status(404).json({ error: "User does not exist" });
    }
  },

  register: async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    const nume = req.body.nume;
    const status = req.body.status;

    try {
      let user = usersModel.findOne({ where: { mail: mail } });
      if (user) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await usersModel.create({
          nume,
          mail,
          status,
          password: hashedPassword,
        });
        const jwtToken = generateAccessToken(user);
        console.log(user);
        return res.status(200).json({ user, jwtToken });
      } else {
        return res.status(409).json({ message: "user deja existent" });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(400).json({ message: "Invalid email" });
      }
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: "Email already used" });
      }
      return res.status(500).json({ message: "server error", err: err });
    }
  },
  deleteUser: async (req, res) => {
    let mail = req.body.mail;
    console.log(mail);
    await usersModel
      .destroy({
        where: { mail: mail },
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
    let new_user = {};
    if (req.body.hasOwnProperty("password")) {
      console.log("password received: ", req.body.password);
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      console.log("INTRU AICI S HASHED PASSWORD UL ESTE:", hashedPassword);
      new_user = { ...req.body, password: hashedPassword };
    } else {
      new_user = { ...req.body };
    }

    await usersModel
      .update(
        {
          ...new_user,
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

  getUserNameById: async (req, res) => {
    const { id_user } = req.params;
    const user = await usersModel.findByPk(id_user);
    if (!user) {
      return res.status(404).json({ message: "user id is not valid" });
    } else {
      return res.status(200).json({ nume: user.nume, mail: user.mail });
    }
  },
};

module.exports = controller;
