const Sequelize = require("sequelize");
const db = require("../config/db");
const mysql = require("mysql2/promise.js");
const env = require("dotenv");

env.config();

const usersModel = require("./user");
const assigmentsModel = require("./assigment");
const cereriCursModel = require("./cerereCurs");
const cursuriModel = require("./curs");
const intrebariModel = require("./intrebare");
const istoricuriPunctajeModel = require("./istoricPunctaje");
const istoricAssigmentsModel = require("./istoricAssigments");
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
const istoricAssigments = istoricAssigmentsModel(db, Sequelize);
const resurse = resurseModel(db, Sequelize);
const varianteDeRaspuns = varianteDeRaspunsModel(db, Sequelize);
const assigment = assigmentsModel(db, Sequelize);

cursuri.hasMany(cereriCurs, {
  foreignKey: "id_curs",
  as: "cereriCursuri",
});

intrebari.hasMany(varianteDeRaspuns, {
  foreignKey: "id_intrebare",
  as: "varianteDeRaspuns",
});

function Create_DB() {
  let conn;

  mysql
    .createConnection({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    })
    .then((connection) => {
      conn = connection;
      return connection.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`
      );
    })
    .then(() => {
      return conn.end();
    })
    .catch((err) => {
      console.warn(err.stack);
    });
}

function DB_Init() {
  Create_DB();
}

module.exports = {
  cereriCurs,
  cursuri,
  istoricuriPunctaje,
  resurse,
  sectiuni,
  assigment,
  teste,
  varianteDeRaspuns,
  users,
  intrebari,
  istoricAssigments,
  connection: db,
  DB_Init,
};
