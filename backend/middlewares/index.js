const jwt = require("jsonwebtoken");
require("dotenv").config();

const middlewares = {
  auth: async (req, res, next) => {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (!token) {
      res.status(500).send({ message: "nu exista token" });
    } else {
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).send({ message: "nu e token ul bun" });
        }
        req.user = user;
        next();
      });
    }
    next();
  },
};

module.exports = middlewares;
