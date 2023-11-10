const other = require("./others");
const assigments = require("./assigment");
const cereriCurs = require("./cerereCurs");
const cursuri = require("./curs");
const intrebari = require("./intrebare");
const istoricuriPunctaje = require("./istoricPunctaje");
const resurse = require("./resursa");
const sectiuni = require("./sectiune");
const teste = require("./test");
const useri = require("./user");
const varianteDeRaspuns = require("./variantaDeRaspuns");
const controllers = {
  cursuri,
  intrebari,
  istoricuriPunctaje,
  resurse,
  sectiuni,
  teste,
  useri,
  varianteDeRaspuns,
  cereriCurs,
  assigments,
  other,
};
module.exports = controllers;
