const Sequelize = require("sequelize");
const db = require("../config/db");
const usersModel = require("./user");
const cereriCursModel = require("./cerereCurs");
const cursuriModel = require("./curs");
const intrebariModel = require("./intrebare");
const istoricuriPunctajeModel = require("./istoricPunctaje");
const resurseModel = require("./resursa");
const sectiuniModel = require("./sectiune");
const testeModel = require("./test");
const varianteDeRaspunsModel = require("./variantaDeRaspuns");

const users = usersModel(db, Sequelize);
const sectiuni = sectiuniModel(db, Sequelize);
const teste = testeModel(db, Sequelize);
const intrebari = intrebariModel(db, Sequelize);
const cereriCurs = cereriCursModel(db, Sequelize);
const cursuri = cursuriModel(db, Sequelize);
const istoricuriPunctaje = istoricuriPunctajeModel(db, Sequelize);
const resurse = resurseModel(db, Sequelize);
const varianteDeRaspuns = varianteDeRaspunsModel(db, Sequelize);
module.exports = {
  cereriCurs,
  cursuri,
  istoricuriPunctaje,
  resurse,
  sectiuni,
  teste,
  varianteDeRaspuns,
  users,
  intrebari,
  connection: db,
};
