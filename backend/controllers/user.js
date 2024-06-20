const usersModel = require("../models").users;
const cereriCursuriModel = require("../models").cereriCurs
const sectiuniModel = require("../models").sectiuni
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const istoricuriPunctajeModel  = require("../models").istoricuriPunctaje;
const testeModel = require("../models").teste
require("dotenv").config();
const { Parser } = require('json2csv');
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

const generateAccessToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: "2h" });
};



const controller = {
  generateUsersCSV: async (req, res) => {
    try {
      const users = await usersModel.findAll();

      const usersData = users.map(user => ({
        id_utilizator: user.id_utilizator,
        nume: user.nume,
        mail: user.mail,
      }));

      console.log('Utilizatori transformați:', usersData);

      if (!usersData || usersData.length === 0) {
        return res.status(404).json({ error: 'Nu există utilizatori' });
      }

      const fields = ['id_utilizator', 'nume', 'mail']; 
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(usersData);

      res.header('Content-Type', 'text/csv');
      res.attachment('utilizatori.csv');
      res.send(csv);
    } catch (err) {
      console.error('Eroare la generarea CSV-ului:', err);
      res.status(500).json({ error: err.message });
    }
  },
  generatePerformanceReport : async (req, res) => {
    try {
      const users = await usersModel.findAll({
        where: {
          status: 'junior'
        }
      });
  
      const punctaje = await istoricuriPunctajeModel.findAll();
      const testeList = await testeModel.findAll();
      const sectiuniList = await sectiuniModel.findAll();
  
      let reportData = [];
  
      users.forEach(user => {
        const userScores = punctaje.filter(p => p.id_utilizator === user.id_utilizator);
        const latestScores = userScores.reduce((acc, cur) => {
          if (!acc[cur.id_test] || new Date(acc[cur.id_test].data_sustinere) < new Date(cur.data_sustinere)) {
            acc[cur.id_test] = cur;
          }
          return acc;
        }, {});
  
        Object.values(latestScores).forEach(punctaj => {
          const testDetails = testeList.find(test => test.id_test === punctaj.id_test);
          if (testDetails) {
            const sectionDetails = sectiuniList.find(sectiune => sectiune.id_sectiune === testDetails.id_sectiune);
            reportData.push({
              userId: user.id_utilizator,
              userName: user.nume,
              testId: punctaj.id_test,
              sectionName: sectionDetails ? sectionDetails.denumire : 'N/A',
              score: punctaj.punctaj_obtinut,
              passDate: punctaj.data_sustinere,
              status: punctaj.punctaj_obtinut >= testDetails.punctaj_minim_promovare ? 'Promovat' : 'Nepromovat'
            });
          }
        });
      });
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Performance Report');
  
      worksheet.columns = [
        { header: 'User ID', key: 'userId', width: 10 },
        { header: 'User Name', key: 'userName', width: 30 },
        { header: 'Test ID', key: 'testId', width: 10 },
        { header: 'Section Name', key: 'sectionName', width: 30 },
        { header: 'Score', key: 'score', width: 10 },
        { header: 'Pass Date', key: 'passDate', width: 20 },
        { header: 'Status', key: 'status', width: 15 },
      ];
  
      worksheet.addRows(reportData);
  
      const chartData = reportData.reduce((acc, cur) => {
        const testId = cur.testId;
        if (!acc[testId]) {
          acc[testId] = { promovat: 0, nepromovat: 0 };
        }
        if (cur.status === 'Promovat') {
          acc[testId].promovat++;
        } else {
          acc[testId].nepromovat++;
        }
        return acc;
      }, {});
  
      const chartWorksheet = workbook.addWorksheet('Pie Chart Data');
      chartWorksheet.addRow(['Test id', 'Promovat', 'Nepromovat']);
      Object.entries(chartData).forEach(([testId, data]) => {
        chartWorksheet.addRow([testId, data.promovat, data.nepromovat]);
      });
  
      const filePath = path.join(__dirname, '..', 'reports', 'performance_report.xlsx');
  
      await workbook.xlsx.writeFile(filePath);
  
      res.download(filePath, 'performance_report.xlsx', (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).send('Error downloading file');
        } else {
          fs.unlinkSync(filePath);
        }
      });
    } catch (error) {
      console.error('Error generating performance report:', error);
      res.status(500).send('Error generating performance report');
    }
  },  
  getAllUsers: async (req, res) => {
    console.log("ajunge unde trebuie");
    const filter = req.query;
    if (!filter.take) filter.take = 10;

    if (!filter.skip) filter.skip = 1;

    let whereClause = {};
    if (filter.nume) whereClause.nume = { [LikeOp]: `%${filter.nume}%` };

    await usersModel
      .findAndCountAll({
        where: { ...whereClause },
        limit: parseInt(filter.take),
        offset: parseInt(filter.skip - 1) * parseInt(filter.take),
      })
      .then((rezultat) => {
        return res.status(200).send({ requests: rezultat });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).send({ message: "server error", err: err });
      });
  },

  login: async (req, res) => {
    console.log(req.body);
    const mail = req.body.mail;
    const password = req.body.password;
    const user = await usersModel.findOne({ where: { mail: mail } });
    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const password_valid = await bcrypt.compare(password, user.password);
    if (!password_valid) {
      return res.status(400).json({ error: "Password Incorrect" });
    }

    const jwtToken = generateAccessToken(user);
   
    return res.status(200).json({
      user: {
        id_utilizator: user.id_utilizator,
        nume: user.nume,
        mail: user.mail,
        status: user.status,
      },
      jwtToken,
    });
  },

  register: async (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
    const nume = req.body.nume;
    const status = req.body.status;

    try {
      let user = usersModel.findOne({ where: { mail: mail } });
      if (user) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await usersModel.create({
          nume,
          mail,
          status,
          password: hashedPassword,
        });
        const jwtToken = generateAccessToken(user);
        console.log(user);
        return res.status(200).json({ user, jwtToken });
      } else {
        return res.status(409).json({ message: "user deja existent" });
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        return res.status(400).json({ message: "Invalid email" });
      }
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: "Email already used" });
      }
      return res.status(500).json({ message: "server error", err: err });
    }
  },
  deleteUser: async (req, res) => {
    try {
      let mail = req.body.mail;
      console.log(mail);
  
      const user = await usersModel.findOne({
        where: { mail: mail },
      });
  
      if (!user) {
        return res.status(400).json({ message: "Nu există utilizatorul cu respectivul mail" });
      }
      await cereriCursuriModel.destroy({
        where: { id_utilizator: user.id_utilizator},
      });
      await istoricuriPunctajeModel.destroy({
        where: { id_utilizator: user.id_utilizator},
      });

      await usersModel.destroy({
        where: { mail: mail },
      });
  
      return res.status(200).send({ message: "Utilizatorul a fost șters" });
    } catch (err) {
      return res.status(500).send({ error: err.message });
    }
  },  
  
  actualizareUser: async (req, res) => {
    const id_utilizator = req.body.id_utilizator;
    let new_user = {};
    if (req.body.hasOwnProperty("password")) {
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      new_user = { ...req.body, password: hashedPassword };
    } else {
      new_user = { ...req.body };
    }

    await usersModel
      .update(
        {
          ...new_user,
        },
        {
          where: {
            id_utilizator: id_utilizator,
          },
        }
      )
      .then((rez) => {
        return res
          .status(200)
          .send({ message: "A fost actualizat utilizatorul" });
      })
      .catch((err) => {
        return res.status(500).send({
          message: "A aparut o eroare la actualizarea utilizatorului",
          err: err,
        });
      });
  },

  getUserNameById: async (req, res) => {
    const { id_user } = req.params;
    const user = await usersModel.findByPk(id_user);
    if (!user) {
      return res.status(404).json({ message: "user id is not valid" });
    } else {
      return res.status(200).json({ nume: user.nume, mail: user.mail });
    }
  },
};

module.exports = controller;
