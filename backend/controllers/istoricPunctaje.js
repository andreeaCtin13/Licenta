const istoricuriPunctajeModel = require("../models").istoricuriPunctaje;
const testeModel = require("../models").teste;
const sectiuniModel = require("../models").sectiuni;
const utilizatoriModel = require("../models").users;
const sequelize = require("../config/db");
const controller = {
  getAllIstoricuriPunctaje: (req, res) => {
    res.status(200).send({ message: "totu ok la istoricuri punctaje" });
  },
  insertGrade: async (req, res) => {
    const { grade, id_test, id_utilizator } = req.body;
    let date = new Date();
    await istoricuriPunctajeModel
      .create({
        data_sustinere: date,
        id_utilizator,
        id_test,
        punctaj_obtinut: grade,
      })
      .then(() => {
        return res.status(200).json({
          message: "succes",
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "server error",
          err: err,
        });
      });
  },
  getLastIstoricOfAUser: async (req, res) => {
    const { id_utilizator, id_sectiune } = req.params;

    const sectiune = sectiuniModel.findByPk(id_sectiune);
    if (!sectiune) {
      return res.status(400).json({
        message: "sectiune invalida",
      });
    }

    const test = await testeModel.findAll({
      where: {
        id_sectiune,
      },
    });

    if (!test || test.length === 0) {
      return res.status(400).json({ message: "test invalid" });
    }

    console.log("test", test);

    const id_test = test[0].id_test;
    const istoric = await istoricuriPunctajeModel.findAll({
      where: {
        id_utilizator,
        id_test,
      },
    });
    if (!istoric || istoric.length === 0) {
      return res.status(200).json({
        message: "nu exista istoric",
      });
    }
    return res.status(200).json({
      message: "ok",
      lastHistory: {
        istoric: istoric[istoric.length - 1],
        punctaj_minim_promovare: test[0].punctaj_minim_promovare,
      },
    });
  },
  getIstoricPunctajeOfAUser: async (req, res) => {
    const { id_utilizator } = req.params;

    let user = await utilizatoriModel.findByPk(id_utilizator);
    if (!user) {
      return res.status(400).json({
        message: "nu exista utilizator cu id-ul mentionat",
      });
    }

    const query = `
      SELECT ip.*
      FROM istoricuri_punctaje ip
      INNER JOIN teste t ON ip.id_test = t.id_test
      WHERE ip.id_utilizator = :id_utilizator
        AND ip.punctaj_obtinut >= t.punctaj_minim_promovare;
    `;

    let istoric = await sequelize.query(query, {
      replacements: { id_utilizator },
      type: sequelize.QueryTypes.SELECT,
    });

    const luniInRomana = {
      0: "ianuarie",
      1: "februarie",
      2: "martie",
      3: "aprilie",
      4: "mai",
      5: "iunie",
      6: "iulie",
      7: "august",
      8: "septembrie",
      9: "octombrie",
      10: "noiembrie",
      11: "decembrie",
    };

    const numarTestePeLuni = {};

    istoric.forEach((punctaj) => {
      const data = new Date(punctaj.data_sustinere);
      const luna = luniInRomana[data.getMonth()];
      if (!numarTestePeLuni[luna]) {
        numarTestePeLuni[luna] = 1;
      } else {
        numarTestePeLuni[luna]++;
      }
    });

    return res.status(200).json({
      numarTestePeLuni: numarTestePeLuni,
      message: "Succes",
    });
  },
  getNoPromovateOrNepromovate: async (req, res) => {
    const { id_curs } = req.params;

    const query1 = `
    SELECT ip.*
    FROM istoricuri_punctaje ip
    INNER JOIN teste t ON ip.id_test = t.id_test
    WHERE ip.punctaj_obtinut >= t.punctaj_minim_promovare;
  `;

    const query2 = `
  SELECT ip.*
  FROM istoricuri_punctaje ip
  INNER JOIN teste t ON ip.id_test = t.id_test;
`;
    let total = await sequelize.query(query2, {
      replacements: { id_curs },
      type: sequelize.QueryTypes.SELECT,
    });

    let istoric = await sequelize.query(query1, {
      replacements: { id_curs },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.status(200).json({
      message: "succes",
      promovate: istoric.length,
      nepromovate: total.length - istoric.length,
    });
  },
  getTestsPromotedPerMonth: async (req, res) => {
    const { id_curs } = req.params;

    try {
        const query = `
            SELECT COUNT(ip.id_istoric) AS numar_promovate, 
                MONTH(ip.data_sustinere) AS luna
            FROM istoricuri_punctaje ip
            INNER JOIN teste t ON ip.id_test = t.id_test
            INNER JOIN sectiuni s ON t.id_sectiune = s.id_sectiune
            WHERE ip.punctaj_obtinut >= t.punctaj_minim_promovare
                AND s.id_curs = :id_curs
            GROUP BY MONTH(ip.data_sustinere);
        `;

        const testsPerMonth = await sequelize.query(query, {
            replacements: { id_curs },
            type: sequelize.QueryTypes.SELECT,
        });

        const numarTestePromovatePerLuna = {};
        testsPerMonth.forEach((result) => {
            const luniInRomana = {
                1: "ianuarie",
                2: "februarie",
                3: "martie",
                4: "aprilie",
                5: "mai",
                6: "iunie",
                7: "iulie",
                8: "august",
                9: "septembrie",
                10: "octombrie",
                11: "noiembrie",
                12: "decembrie",
            };
            const luna = luniInRomana[result.luna];
            numarTestePromovatePerLuna[luna] = result.numar_promovate;
        });

        res.status(200).json({
            numarTestePromovatePerLuna,
            message: "Success",
        });
    } catch (error) {
        console.error("Error fetching promoted tests per month:", error);
        res.status(500).json({ message: "Server error" });
    }

  },
  getChartUserPunctajeObtinute : async (req, res) => {
    try {
      const userId = req.params.id_utilizator;
  
      const punctaje = await istoricuriPunctajeModel.findAll({
        where: { id_utilizator: userId },
        order: [['data_sustinere', 'ASC']]
      });
  
      const latestPunctajeMap = new Map();
      punctaje.forEach(p => {
        if (!latestPunctajeMap.has(p.id_test) || latestPunctajeMap.get(p.id_test).data_sustinere < p.data_sustinere) {
          latestPunctajeMap.set(p.id_test, p);
        }
        else{
          latestPunctaje.set(p.id_test, p)
        }
      });
      const latestPunctaje = Array.from(latestPunctajeMap.values());
  
      // Extrage id-urile testelor din ultimul istoric
      const testeIds = latestPunctaje.map(p => p.id_test);
  
      // Obține detaliile testelor pentru id-urile extrase
      const teste = await testeModel.findAll({
        where: { id_test: testeIds }
      });
  
      // Extrage id-urile secțiunilor din teste
      const sectiuniIds = teste.map(t => t.id_sectiune);
  
      // Obține detaliile secțiunilor pentru id-urile extrase
      const sectiuni = await sectiuniModel.findAll({
        where: { id_sectiune: sectiuniIds }
      });
  
      // Construiește rezultatul final combinând datele din cele trei interogări
      const result = latestPunctaje.map(p => {
        const test = teste.find(t => t.id_test === p.id_test);
        const sectiune = sectiuni.find(s => s.id_sectiune === test.id_sectiune);
        return {
          data_sustinere: p.data_sustinere,
          punctaj_obtinut: p.punctaj_obtinut,
          sectiune: sectiune.denumire
        };
      });
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

};

module.exports = controller;
