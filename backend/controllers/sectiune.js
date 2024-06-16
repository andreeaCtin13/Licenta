const sectiuniModel = require("../models").sectiuni;
const cursuriModel = require("../models").cursuri;
const cerinteModel = require("../models").assigment;
const testeModel = require("../models").teste;
const intrebariModel = require("../models").intrebari;
const varianteModel = require("../models").varianteDeRaspuns;
const resurseModel = require("../models").resurse;

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

  updateSectiune : async (req, res) => {
    const { id_sectiune } = req.params;
    const { denumire, descriere, video_link } = req.body;
  
    try {
      // Verificăm dacă secțiunea există în baza de date
      let existingSectiune = await sectiuniModel.findByPk(id_sectiune);
      if (!existingSectiune) {
        return res.status(404).json({ message: "Secțiunea nu există în baza de date." });
      }
  
      // Actualizăm denumirea și descrierea dacă sunt furnizate
      if (denumire) {
        existingSectiune.denumire = denumire;
      }
      if (descriere) {
        existingSectiune.descriere = descriere;
      }
      await existingSectiune.save();
  
      // Căutăm resursa video asociată secțiunii
      let existingVideoResource = await resurseModel.findOne({
        where: {
          id_sectiune,
          tip_resursa: "video_link",
        },
      });
  
      if (video_link) {
        if (existingVideoResource) {
          // Actualizăm link-ul resursei video
          existingVideoResource.link_resursa = video_link;
          await existingVideoResource.save();
        } else {
          // Creăm o nouă resursă video dacă nu există
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
      punctaj_minim_promovare,
    } = req.body; 

    try {
      let curs = await cursuriModel.findByPk(id_curs);
      if (!curs) {
        return res.status(400).json({ message: "nu exista curs cu id ul respectiv" });
      } else {
        let newSectiune = await sectiuniModel.create({
          denumire,
          descriere,
          id_curs,
        });

        let id_sectiune = newSectiune.id_sectiune;

        for (let i = 0; i < cerinte?.length; i++) {
          await cerinteModel.create({
            titlu: cerinte[i].titlu_cerinta,
            cerinta: cerinte[i].cerinta,
            id_sectiune,
          });
        }

        let newTest = await testeModel.create({
          punctaj_minim_promovare,
          numar_intrebari: intrebari.length,
          id_sectiune,
        });

        for (let i = 0; i < intrebari?.length; i++) {
          let newIntrebare = await intrebariModel.create({
            text_intrebare: intrebari[i].requirement,
            punctaj_intrebare: intrebari[i].punctaj_intrebare,
            id_test: newTest.id_test,
          });

          for (let j = 0; j < intrebari[i].variante_de_raspuns?.length; j++) {
            await varianteModel.create({
              id_intrebare: newIntrebare.id_intrebare,
              text_varianta: intrebari[i].variante_de_raspuns[j].text_varianta,
              este_corecta: intrebari[i].variante_de_raspuns[j].este_corecta,
            });
          }
        }

        await resurseModel.create({
          tip_resursa: "video_link",
          link_resursa: resurse.video_link,
          titlu_resursa: denumire,
          id_sectiune,
        });

        for (let i = 0; i < req.files?.length; i++) {
          await resurseModel.create({
            id_sectiune,
            tip_resursa: "pdf_path",
            link_resursa: req.files[i].path,
            titlu_resursa: req.files[i].originalname,
          });
        }

        return res.status(200).json({ sectiune: newSectiune, message: "successful" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "server error" });
    }
  },

  getSectiuneById: async (req, res) => {
    console.log(req.body.id_sectiune);
    const sectiune = await sectiuniModel.findByPk(req.params.id_sectiune);
    return res.status(200).json({ sectiune: sectiune });
  },
};

module.exports = controller;
