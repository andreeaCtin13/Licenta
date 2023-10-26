const express = require("express");
const cors = require("cors");
const port = 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
  res.status(200).send({ message: "Backend-ul e pornit" });
});

app.listen(port, () => {
  console.log("totul ok");
});
