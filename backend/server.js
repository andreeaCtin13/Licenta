const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();
const port = process.env.PORT || 8006;
const router = require("./routes");
const cors = require("cors");
const auth = require("./middlewares/index").auth;
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public/files"));

app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/jwt-secret", auth, (req, res) => {
//   res.status(200).send({ message: "ESTI AUTORIZAT" });
// });

// app.use("/", auth, router);
app.use("/", router);

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
