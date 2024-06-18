const testeModel = require("../models").teste;
const sectiuniModel = require("../models").sectiuni;
const intrebariModel = require("../models").intrebari
const varianteRaspunsModel = require("../models").varianteDeRaspuns
const sequelize = require("../config/db");

const controller = {

  insertTest: async (req, res) => {
    const { punctaj_minim_promovare, numar_intrebari, id_sectiune } = req.body;

    let sectiune = await sectiuniModel.findByPk(id_sectiune);
    if (!sectiune) {
      return res
        .status(400)
        .json({ message: "nu exista sectiunea pentru care este testul" });
    }
    await testeModel
      .create({
        punctaj_minim_promovare,
        numar_intrebari,
        id_sectiune,
      })
      .then((rez) => {
        return res.status(200).json({ test: rez, message: "success" });
      })
      .catch((err) => {
        return res.status(500).json({ error: err, message: "server error" });
      });
  },
  getTestById: async (req, res) => {
    const { id_sectiune } = req.params;

    console.log("sectiune", id_sectiune);
    const teste = await testeModel
      .findAll({
        where: {
          id_sectiune: id_sectiune,
        },
      })
      .then((rez) => {
        return res.status(200).json({
          test: rez,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: "server error" });
      });
  },
  getTestForEdit:async (req,res)=>{
    const {id_test} = req.params;

    try {
      const test = await testeModel.findByPk(id_test);
      console.log("testL - ", test)
      if (!test) {
        return res.status(404).json({ error: 'Testul nu a fost găsit.' });
      }
  
      const intrebari = await intrebariModel.findAll({
        where: { id_test },
      });
  
      const intrebariWithVariante = await Promise.all(intrebari.map(async (intrebare) => {
        const varianteRaspuns = await varianteRaspunsModel.findAll({
          where: { id_intrebare: intrebare.id_intrebare },
        });
        return {
          id_intrebare: intrebare.id_intrebare,
          text_intrebare: intrebare.text_intrebare,
          punctaj_intrebare: intrebare.punctaj_intrebare,
          varianteRaspuns,
        };
      }));
  
      const responseData = {
        id_test: test.id_test,
        punctaj_minim_promovare: test.punctaj_minim_promovare,
        numar_intrebari: intrebari.length,
        intrebari: intrebariWithVariante,
      };
  
      res.json(responseData);
  
    } catch (error) {
      console.error('Error fetching test with questions and answers:', error);
      res.status(500).json({ error: 'Eroare la preluarea testului.' });
    }
  
  },
  getTestIds:async(req,res)=>{
    const { id_sectiune } = req.params;

    try {
      const test = await testeModel.findOne({
        where: { id_sectiune }
      });
  
      if (!test) {
        return res.status(404).json({ message: 'Test not found for section' });
      }
  
      res.json({ id_test: test.id_test });
    } catch (error) {
      console.error('Error fetching test for section:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  editareTest:async(req,res)=>{
    const { id_test } = req.params;
    const {
      punctaj_minim_promovare,
      numar_intrebari,
      intrebari
    } = req.body;
  
    console.log("punctaj minim:", punctaj_minim_promovare)
    console.log("numar_intrebari", numar_intrebari)
    console.log("intrebari", intrebari)
    let transaction;
  
    try {
      transaction = await sequelize.transaction();
  
      let test = await testeModel.findByPk(id_test, { transaction });
      if (!test) {
        return res.status(404).json({ error: 'Test not found' });
      }
  
      test.punctaj_minim_promovare = punctaj_minim_promovare;
      await test.save({ transaction });
  
      for (const intrebareData of intrebari) {
        let intrebare;
  
        if (intrebareData.id_intrebare) {
          intrebare = await intrebariModel.findByPk(intrebareData.id_intrebare, { transaction });
          if (!intrebare) {
            throw new Error(`Question ${intrebareData.id_intrebare} not found`);
          }
  
          intrebare.text_intrebare = intrebareData.text_intrebare;
          intrebare.punctaj_intrebare = intrebareData.punctaj_intrebare;
          await intrebare.save({ transaction });
        } else {
          intrebare = await intrebariModel.create({
            id_test:test.id_test,
            text_intrebare: intrebareData.text_intrebare,
            punctaj_intrebare: intrebareData.punctaj_intrebare
          }, { transaction });
  
          // await intrebare.setTest(test, { transaction });
        }
  
        for (const variantaData of intrebareData.varianteRaspuns) {
          let varianta;
  
          if (variantaData.id_varianta) {
            varianta = await varianteRaspunsModel.findByPk(variantaData.id_varianta, { transaction });
            if (!varianta) {
              throw new Error(`Answer ${variantaData.id_varianta} not found`);
            }
  
            varianta.text_varianta = variantaData.text_varianta;
            varianta.este_corecta = variantaData.este_corecta;
            await varianta.save({ transaction });
          } else {
            varianta = await VariantaRaspuns.create({
              text_varianta: variantaData.text_varianta,
              este_corecta: variantaData.este_corecta,
              id_intrebare:intrebareData.id_intrebare
            }, { transaction });
  
            // await varianta.setIntrebare(intrebare, { transaction });
          }
        }
      }
  
      // Finalizăm tranzacția
      await transaction.commit();
  
      // Returnăm răspunsul de succes
      res.json({ message: 'Test updated successfully' });
    } catch (error) {
      // Rollback tranzacția în caz de eroare
      if (transaction) await transaction.rollback();
  
      console.error('Error updating test:', error);
      return res.status(500).json({ error: 'Could not update test' });
    }
  },
  

};

module.exports = controller;
