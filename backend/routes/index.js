const express = require("express");
const router = express.Router();
const otherRoute = require("./other");
const assigmentsRoute = require("./assigment");
const cereriCursRoute = require("./cerereCurs");
const cursuriRoute = require("./curs");
const intrebariRoute = require("./intrebare");
const istoricPunctajeRoute = require("./istoricPunctaje");
const resurseRoute = require("./resursa");
const sectiuniRoute = require("./sectiune");
const testeRoute = require("./test");
const useriRoute = require("./user");
const varianteDeRaspunsRoute = require("./variantaDeRaspuns");

router.use("/", otherRoute);
router.use("/assigments", assigmentsRoute);
router.use("/cereriCurs", cereriCursRoute);
router.use("/curs", cursuriRoute);
router.use("/intrebare", intrebariRoute);
router.use("/istoricuriPunctaje", istoricPunctajeRoute);
router.use("/resurse", resurseRoute);
router.use("/sectiuni", sectiuniRoute);
router.use("/teste", testeRoute);
router.use("/useri", useriRoute);
router.use("/varianteDeRaspuns", varianteDeRaspunsRoute);

module.exports = router;
