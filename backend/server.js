const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();
const port = process.env.PORT || 8006;
const router = require("./routes");
const cors = require("cors");
const auth = require("./middlewares/index").auth;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.static("public/files"));

app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/jwt-secret", auth, (req, res) => {
//   res.status(200).send({ message: "ESTI AUTORIZAT" });
// });

app.use("/", router);

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
