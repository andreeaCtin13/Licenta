const sectiuniModel = require("../models").sectiuni;
const cursuriModel = require("../models").cursuri;
const cerinteModel = require("../models").assigment;
const testeModel = require("../models").teste;
const intrebariModel = require("../models").intrebari;
const varianteModel = require("../models").varianteDeRaspuns;
const resurseModel = require("../models").resurse;
const multer = require("multer");
const express = require("express");
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.originalname}-${uniqueSuffix}`);
  },
});

const upload = multer({ storage: storage });

const upload = multer({ storage: storage });

app.post("/upload", upload.array("file"), (req, res) => {
  console.log("Fișiere încărcate:", req.files);
  res.json({ message: "Fișiere încărcate cu succes!" });
});

const controller = {
  insertFile: (req, res) => {
    console.log("Fișiere încărcate:", req.files);
    // Trimite un răspuns la client
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
  insertSectiune: async (req, res) => {
    const {
      denumire,
      descriere,
      id_curs,
      intrebari,
      cerinte,
      resurse,
      punctaj_minim_promovare,
    } = req.body;
    const files = req.files;
    console.log("files", files);
    upload.array("file");

    try {
      let curs = await cursuriModel.findByPk(id_curs);
      if (!curs) {
        return res
          .status(400)
          .json({ message: "nu exista curs cu id ul respectiv" });
      } else {
        await sectiuniModel
          .create({
            denumire,
            descriere,
            id_curs,
          })
          .then(async (rez) => {
            id_sectiune = rez.id_sectiune;
            console.log("s-a inserat sectiunea");
            for (let i = 0; i < cerinte.length; i++) {
              await cerinteModel
                .create({
                  titlu: cerinte[i].titlu_cerinta,
                  cerinta: cerinte[i].cerinta,
                  id_sectiune,
                })
                .then(() => {
                  console.log("s-au inserat cerintele");
                });
            }
            await testeModel
              .create({
                punctaj_minim_promovare,
                numar_intrebari: intrebari.length,
                id_sectiune,
              })
              .then(async (rez) => {
                console.log("s-a inserat testul");
                for (let i = 0; i < intrebari.length; i++) {
                  await intrebariModel
                    .create({
                      text_intrebare: intrebari[i].requirement,
                      punctaj_intrebare: intrebari[i].punctaj_intrebare,
                      id_test: rez.id_test,
                    })
                    .then(async (rez) => {
                      console.log("s-au inserat intrebarile");
                      for (
                        let j = 0;
                        j < intrebari[i].variante_de_raspuns.length;
                        j++
                      ) {
                        await varianteModel
                          .create({
                            id_intrebare: rez.id_intrebare,
                            text_varianta:
                              intrebari[i].variante_de_raspuns[j].text_varianta,
                            este_corecta:
                              intrebari[i].variante_de_raspuns[j].este_corecta,
                          })
                          .then(() => {
                            console.log("s-au inserat variantele de raspuns");
                          })
                          .catch((err) => {
                            console.log(err);
                            return res.status(500).json({
                              message: "variantele nu s-au inserat cum trebuie",
                            });
                          });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      return res.status(500).json({
                        message: "intrebarile nu sunt inserate cum trebuie",
                      });
                    });
                }
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({
                  message: "testul nu a fost inserat cum trebuie",
                });
              });
            await resurseModel
              .create({
                tip_resursa: "video_link",
                link_resursa: resurse.video_link,
                titlu_resursa: denumire,
                id_sectiune,
              })
              .then(() => {
                console.log("s-a inserat video link ul");
              })
              .catch((err) => {
                console.log(err);
                return res.status(500).json({
                  message: "nu s a inserat resursa video",
                });
              });
            console.log("ajung aici", resurse.pdfs.length);

            for (let i = 0; i < resurse.pdfs.length; i++) {
              console.log("resurse[i]", resurse.pdfs[i]);
              await resurseModel
                .create({
                  id_sectiune,
                  tip_resursa: "pdf_path",
                  link_resursa: resurse.pdfs[i].file_object.path,
                  titlu_resursa: resurse.pdfs[i].denumire,
                })
                .then(() => {
                  console.log("s-a introdus pdf ul");
                })
                .catch((err) => {
                  console.log(err);
                  return res
                    .status(500)
                    .json({ message: "eroare la insert de pdf " });
                });
            }

            return res
              .status(200)
              .json({ sectiune: rez, message: "successful" });
          });
      }
    } catch (err) {
      return res.status(500).json({ message: "server error" });
    }
  },
};

module.exports = controller;
