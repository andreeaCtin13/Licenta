const express = require("express");
const port = 8080;
const router = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscribesharefollowcevasecretkeyiguess",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);
app.use("/", router);
app.use("/", (req, res) => {
  res.status(200).send({ message: "Backend-ul e pornit" });
});
app.listen(port, () => {
  console.log("totul ok");
});
