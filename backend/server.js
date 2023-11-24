const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8081;
const router = require("./routes");
const auth = require("./middlewares/index").auth;
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/jwt-secret", auth, (req, res) => {
  res.status(200).send({ message: "ESTI AUTORIZAT" });
});
app.use("/", router);
app.use("/", (req, res) => {
  res.status(200).send({ message: "Backend-ul e pornit" });
});
app.listen(port, () => {
  console.log("totul ok");
});
