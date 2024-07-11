const sequelize = require("../config/db");
const sectiuniModel = require("../models").sectiuni;
const cursuriModel = require("../models").cursuri;
const cerinteModel = require("../models").assigment;
const testeModel = require("../models").teste;
const intrebariModel = require("../models").intrebari;
const varianteModel = require("../models").varianteDeRaspuns;
const resurseModel = require("../models").resurse;
const istoricPunctajeModel = require("../models").istoricuriPunctaje
const istoricCerinteModel = require("../models").istoricAssigments
const path = require('path');

const controller = {
  insertFile: (req, res) => {
    console.log("Fișiere încărcate:", req.files);
    res.json({ message: "Fișiere încărcate cu succes!" });
  },

  getAllSectiuni: async (req, res) => {
    const { id_curs } = req.params;
    try {
      let sectiuni = await sectiuniModel.findAll({ where: { id_curs } });
      return res.status(200).json({ sectiuni: sectiuni, message: "succes" });
    } catch (err) {
      return res.status(500).json({ message: "server error", err: err });
    }
  },

  getAllSectiuniDetails:async(req,res)=>{
    const { id_curs } = req.params;

    try {
      let sectiuni = await sectiuniModel.findAll({ where: { id_curs } });
  
      const sectiuniCuDetalii = await Promise.all(
        sectiuni.map(async (sectiune) => {
          const [resurse, cerinte, teste] = await Promise.all([
            resurseModel.findAll({ where: { id_sectiune: sectiune.id_sectiune } }),
            cerinteModel.findAll({ where: { id_sectiune: sectiune.id_sectiune } }),
            testeModel.findAll({ where: { id_sectiune: sectiune.id_sectiune } }),
          ]);
  
          return {
            ...sectiune.dataValues,
            resurse,
            cerinte,
            teste,
          };
        })
      );
  
      return res.status(200).json({ sectiuni: sectiuniCuDetalii, message: "success" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "server error", err: err });
    }
  },

  updateSectiune : async (req, res) => {
    const { id_sectiune } = req.params;
    const { denumire, descriere, video_link } = req.body;
  
    try {
      // Verificăm dacă secțiunea există în baza de date
      let existingSectiune = await sectiuniModel.findByPk(id_sectiune);
      if (!existingSectiune) {
        return res.status(404).json({ message: "Secțiunea nu există în baza de date." });
      }
  
      if (denumire) {
        existingSectiune.denumire = denumire;
      }
      if (descriere) {
        existingSectiune.descriere = descriere;
      }
      await existingSectiune.save();
  
      let existingVideoResource = await resurseModel.findOne({
        where: {
          id_sectiune,
          tip_resursa: "video_link",
        },
      });
  
      if (video_link) {
        if (existingVideoResource) {
          existingVideoResource.link_resursa = video_link;
          await existingVideoResource.save();
        } else {
          await resurseModel.create({
            tip_resursa: "video_link",
            link_resursa: video_link,
            titlu_resursa: denumire || existingSectiune.denumire,
            id_sectiune,
          });
        }
      }
  
      return res.status(200).json({ message: "Actualizare realizată cu succes." });
    } catch (err) {
      console.error("Eroare în actualizarea secțiunii:", err);
      return res.status(500).json({ message: "Eroare server." });
    }
  },  

  insertSectiune: async (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    const {
      denumire,
      descriere,
      id_curs,
      intrebari,
      cerinte,
      resurse,
      video_link,
      punctaj_minim_promovare,
    } = JSON.parse(req.body.sectionData);
  
    if(denumire.length>100 || denumire.length<3){
      return res.status(400).json("Denumire sectiune prea lungă")
    }

    if(descriere.length>100 || descriere.length<3){
      return res.status(400).json("Descriere sectiune prea lungă")
    }

    const transaction = await sequelize.transaction();
    console.log("denumire len",denumire.length)
    try {
      let curs = await cursuriModel.findByPk(id_curs, { transaction });
      if (!curs) {
        await transaction.rollback();
        return res.status(400).json({ message: "nu exista curs cu id ul respectiv" });
      } else {
        let newSectiune = await sectiuniModel.create({
          denumire,
          descriere,
          id_curs,
        }, { transaction });
  
        let id_sectiune = newSectiune.id_sectiune;
        console.log("inainte de cerinte")
        let newTest = await testeModel.create({
          punctaj_minim_promovare,
          numar_intrebari: intrebari.length,
          id_sectiune,
        }, { transaction });
        console.log("inainte de intrebari")
  
        for (let i = 0; i < intrebari?.length; i++) {
        let newIntrebare = await intrebariModel.create({
            text_intrebare: intrebari[i].requirement,
            punctaj_intrebare: intrebari[i].punctaj_intrebare,
            id_test: newTest.id_test,
        }, { transaction });

        for (let j = 0; j < intrebari[i].variante_de_raspuns?.length; j++) {
          console.log("AI", intrebari[i].variante_de_raspuns[j].value)

            await varianteModel.create({
                id_intrebare: newIntrebare.id_intrebare,
                text_varianta: intrebari[i].variante_de_raspuns[j].value, // Ensure correct field name
                este_corecta: intrebari[i].variante_de_raspuns[j].este_corecta,
            }, { transaction });
        }
        }
      
        
        console.log("inainte de video")
        await resurseModel.create({
          tip_resursa: "video_link",
          link_resursa: video_link,
          titlu_resursa: denumire,
          id_sectiune,
        }, { transaction });
        console.log("inainte de fisiere")

        for (let i = 0; i < req.files?.length; i++) {
          const absolutePath = path.resolve(__dirname, '..', req.files[i].path);
          await resurseModel.create({
            id_sectiune,
            tip_resursa: "pdf_path",
            link_resursa: absolutePath,
            titlu_resursa: req.files[i].originalname,
          }, { transaction });
        }
  
        await transaction.commit();
  
        return res.status(200).json({ sectiune: newSectiune, message: "successful" });
      }
    } catch (err) {
      await transaction.rollback();
      console.log(err);
      return res.status(500).json({ message: "server error" });
    }
  },
  
  getSectiuneById: async (req, res) => {
    console.log(req.body.id_sectiune);
    const sectiune = await sectiuniModel.findByPk(req.params.id_sectiune);
    return res.status(200).json({ sectiune: sectiune });
  },

  deleteSectiuneOverall: async (req, res) => {
    const { id_sectiune } = req.params;
    const transaction = await sequelize.transaction();

    try {
        const teste = await testeModel.findAll({
            where: { id_sectiune },
            transaction
        });

        const testIds = teste.map(test => test.id_test);

        const intrebari = await intrebariModel.findAll({
            where: { id_test: testIds },
            transaction
        });

        const intrebariIds = intrebari.map(intrebare => intrebare.id_intrebare);

        await varianteModel.destroy({
            where: { id_intrebare: intrebariIds },
            transaction
        });
        console.log("a fost sters variante de rasp")

        await intrebariModel.destroy({
            where: { id_test: testIds },
            transaction
        });
        console.log("a fost sters intrebari")

        await istoricPunctajeModel.destroy({
            where: { id_test: testIds },
            transaction
        });
        console.log("a fost sters istoric punctaje")

        await testeModel.destroy({
            where: { id_test: testIds },
            transaction
        });
        console.log("a fost sters teste")


        await resurseModel.destroy({
            where: { id_sectiune },
            transaction
        });
        console.log("a fost sters resurse")

        const cerinte = await cerinteModel.findAll({
            where: { id_sectiune },
            transaction
        });

        const cerinteIds = cerinte.map(cerinta => cerinta.id_cerinta);

        await istoricPunctajeModel.destroy({
          where: { id_test: testIds },
          transaction
        });
        console.log("a fost sters istoricPunctaje")

        await istoricCerinteModel.destroy({
          where:{id_cerinta:cerinteIds},
          transaction
        })
        console.log("au fost sterse istoricum de cerinte")

        await cerinteModel.destroy({
            where: { id_cerinta: cerinteIds },
            transaction
        });
        console.log("a fost sters cerintele")

        await sectiuniModel.destroy({
            where: { id_sectiune },
            transaction
        });
        console.log("a fost sters sectiunea")

        await transaction.commit();

        return res.status(200).send({ message: 'Secțiunea și toate datele asociate au fost șterse cu succes' });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).send({ error: 'A apărut o eroare la ștergerea secțiunii' });
    }
}


};

module.exports = controller;
