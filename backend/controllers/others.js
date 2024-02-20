const connection = require("../models").connection;
const { DB_Init } = require("../models");

const controller = {
  resetDb: async (req, res) => {
    DB_Init();
    await connection
      .sync({
        force: true,
      })
      .then(() => {
        connection
          .sync({ force: true })
          .then(() => {
            res.status(200).send({ message: "Baza de date a fost resetata" });
          })
          .catch((err) => {
            console.log(err);
            return res
              .status(500)
              .send({ message: "Eroare la resetarea bazei de date", err: err });
          });
      })
      .catch((err) => {
        console.log(err);
        return res
          .status(500)
          .send({ message: "Eroare la resetarea bazei de date" });
      });
  },
};

module.exports = controller;
