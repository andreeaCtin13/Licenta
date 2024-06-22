const cursuriModel = require("../models").cursuri;
const usersModel = require("../models").users;
const multer = require("multer");
const path = require("path");
const ExcelJS = require('exceljs'); 
const sequelize = require("../config/db");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const controller = {
  getAllCursuri: async (req, res) => {
    const filter = req.query;
    if (!filter.take) filter.take = 10;
    if (!filter.skip) filter.skip = 1;

    let whereClause = {};
    if (filter.denumire) {
      whereClause.denumire = { [LikeOp]: `%${filter.denumire}%` };
    }

    await cursuriModel
      .findAndCountAll({
        where: { ...whereClause },
        limit: parseInt(filter.take),
        offset: parseInt(filter.skip - 1) * parseInt(filter.take),
      })
      .then((rezultat) => res.status(200).send({ requests: rezultat }))
      .catch((err) => res.status(500).send({ message: "server error", err }));
  },

  insertCurs: async (req, res) => {
    let { denumire, descriere, id_utilizator } = req.body;

    try {
      let user = await usersModel.findByPk(id_utilizator);

      if (!user) {
        return res
          .status(400)
          .json({ message: "user associated does not exist" });
      }
      if (user.status !== "mentor") {
        return res.status(400).json({ message: "wrong data provided" });
      }

      const imagine_reprezentativa = req.file ? req.file.path : null;

      await cursuriModel
        .create({
          denumire,
          descriere,
          nr_sectiuni: 0, 
          imagine_reprezentativa,
          id_utilizator,
        })
        .then((rez) =>
          res.status(200).json({ user: rez, message: "course created" })
        )
        .catch((err) =>  res.status(500).json({ message: "server error", err }));
    } catch (err) {
      return res.status(500).json({ message: "server error", err });
    }
  },

  getCursById: async (req, res) => {
    const id_curs = req.params.id_curs;
    let curs = await cursuriModel.findByPk(id_curs);
    if (!curs) {
      res.status(400).json({ message: "nu exista curs cu id-ul respectiv" });
    } else {
      res.status(200).json({ curs, message: "success" });
    }
  },

  getCursuriOfAMentor: async (req, res) => {
    const { id_user } = req.params;
    const user = await usersModel.findByPk(id_user);
    if (!user) {
      res
        .status(400)
        .json({ message: "nu ai introdus un id de utilizator valid" });
    }

    const cursuri = await cursuriModel.findAll({
      where: { id_utilizator: id_user },
    });

    if (cursuri && cursuri.length >= 0) {
      res.status(200).json({ cursuri, message: "ok" });
    } else {
      res.status(500).json({ message: "server error" });
    }
  },
  getRaportCerereCurs:async(req,res)=>{
    try {
      const raportPreferinte = await cursuriModel.findAll({
        attributes: ['id_curs', 'denumire', [
          sequelize.literal('(SELECT COUNT(*) FROM cereri_cursuri WHERE cereri_cursuri.id_curs = cursuri.id_curs)'),
          'numar_cereri'
        ]],
        order: [[sequelize.literal('numar_cereri'), 'DESC']]
      });
  
   
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Preferinte Cursuri');

    worksheet.columns = [
      { header: 'ID Curs', key: 'id_curs', width: 10 },
      { header: 'Nume Curs', key: 'nume_curs', width: 30 },
      { header: 'Număr Cereri', key: 'numar_cereri', width: 15 }
    ];

    raportPreferinte.forEach(curs => {
      worksheet.addRow({
        id_curs: curs.id_curs,
        nume_curs: curs.nume_curs,
        numar_cereri: curs.dataValues.numar_cereri
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=raport_preferinte_cursuri.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating preferences report:', error);
    res.status(500).json({ error: 'Could not generate preferences report' });
  }
  }
};

module.exports = controller;