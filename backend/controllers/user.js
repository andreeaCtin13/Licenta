const usersModel = require("../models").users;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "2h" });
};

const controller = {
  getAllUsers: (req, res) => {
    // let user = req.user;
    res.status(200).send("totu ok la user");
  },
  receiveData: (req, res) => {
    let user = req.body;
    let { mail, password } = user;

    if (!mail || !password) {
      res.status(400).send({ message: "Trebuie specificat mail-ul" });
    }

    if (req.session.user) {
      res.send({
        loggedIn: true,
        user: req.session.user,
      });
    } else {
      res.send({ loggedIn: false });
    }
  },

  login: async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;

    const user = await usersModel.findOne({ where: { mail: mail } });
    if (user) {
      const password_valid = await bcrypt.compare(password, user.password);
      if (password_valid) {
        const jwtToken = generateAccessToken(user);
        res.status(200).json({ user, jwtToken });
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      res.status(404).json({ error: "User does not exist" });
    }
  },

  register: async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    const status = req.body.status;

    try {
      let user = usersModel.findOne({ where: { mail: mail } });
      if (user) {
        console.log("ajung aici");
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await usersModel.create({
          mail,
          password: hashedPassword,
          status,
        });
        const jwtToken = generateAccessToken(user);
        res.status(200).send({ user, jwtToken });
      } else {
        res.status(409).send({ message: "user deja existent" });
      }
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = controller;
