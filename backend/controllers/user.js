const usersModel = require("../models").users;
const bcrypt = require("bcrypt");

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
    const user = await usersModel.findOne({ where: { email: req.body.email } });

    if (user) {
      const is_pass_valid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (is_pass_valid) {
        token = jwt.sign(
          { email: user.email, first_name: user.first_name },
          process.env.SECRET
        );
        res.status(200).json({ token: token });
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      res.status(404).json({ error: "User does not exist" });
    }
  },
};

module.exports = controller;
