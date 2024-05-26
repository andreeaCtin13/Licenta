import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router";
import style from "../../styles/mentor/CourseStatus.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Accordion, AccordionTab } from "primereact/accordion";
import Button from "../../components/Button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";

function CourseStatus() {
  const { user, setUser } = useContext(UserContext);
  const { idCourse } = useParams();
  const [sectiuni, setSectiuni] = useState([]);
  const toast = useRef(null);
  const [curs, setCurs] = useState({});
  const fileUploadRefs = useRef({});

  const getCurs = async () => {
    await axios
      .get(`http://localhost:8080/curs/getById/${idCourse}`)
      .then((rez) => {
        setCurs(rez.data.curs);
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "fail",
          summary: "Failed",
          detail: "Eroare la incarcarea cursului",
          life: 3000,
        });
      });
  };

  const getAllSectiuni = async () => {
    await axios
      .get(`http://localhost:8080/sectiuni/selectAll/${idCourse}`)
      .then(async (rez) => {
        let sectiuni = rez.data.sectiuni;
        let sectiuneNou = [];
        for (let i = 0; i < sectiuni.length; i++) {
          await axios
            .get(
              `http://localhost:8080/resurse/getResurseCursSection/${sectiuni[i].id_sectiune}`
            )
            .then(async (rez) => {
              const resurse = rez.data.resurse;

              await axios
                .get(
                  `http://localhost:8080/cerinte/getAllCerinte/${sectiuni[i].id_sectiune}`
                )
                .then(async (rez) => {
                  sectiuneNou.push({
                    ...sectiuni[i],
                    resurse: [...resurse],
                    cerinte: [...rez.data.cerinte],
                  });
                  setSectiuni(sectiuneNou);
                })
                .catch((err) => {
                  console.log(err);
                  toast.current.show({
                    severity: "fail",
                    summary: "Failed",
                    detail: "Eroare la incarcarea cerintelor",
                    life: 3000,
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              toast.current.show({
                severity: "fail",
                summary: "Failed",
                detail: "Eroare la incarcarea resurselor",
                life: 3000,
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "fail",
          summary: "Failed",
          detail: "Eroare la incarcarea sectiunilor",
          life: 3000,
        });
      });
  };

  useEffect(() => {
    getAllSectiuni();
    getCurs();
  }, []);

  const changeSomething = (whatDoIChange) => {};

  const uploadFile = async (file, id) => {
    let formData = new FormData();
    formData.append("tip_resursa", "pdf_path");
    formData.append("id_sectiune", id);
    formData.append("files", file);

    console.log([...formData.entries()]); // Log formData to verify

    await axios
      .post(`http://localhost:8080/resurse/insert`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.current.show({
          severity: "info",
          summary: "Success",
          detail: "File Uploaded",
        });
        getAllSectiuni(); // Refresh sections after upload
        fileUploadRefs.current[id].clear(); // Clear the file input after upload
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "File upload failed",
        });
      });
  };

  const onUpload = ({ files }, id) => {
    const [file] = files;
    uploadFile(file, id);
  };

  const deleteResource = async (resourceId) => {
    await axios
      .delete(`http://localhost:8080/resurse/delete/${resourceId}`)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Resource deleted successfully",
        });
        getAllSectiuni(); // Refresh sections after deletion
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "Failed to delete resource",
        });
      });
  };

  return (
    <div className={style.mainContainer}>
      <Toast ref={toast} />
      <h1>{curs.denumire}</h1>
      <div className={style.buttonZone}>
        <div>
          <Link to={`/new-section/${idCourse}`}>
            <Button
              className={style.btnCreateSection}
              content="Crează o nouă secțiune"
            ></Button>
          </Link>
        </div>
        <div>
          <Link to={`/feedback/${idCourse}`}>
            <Button
              className={style.btnCreateSection}
              content="Acordă direcții soluții"
            ></Button>
          </Link>
        </div>
        <div>
          <Link to={`/requests/${idCourse}`}>
            <Button
              className={style.btnCreateSection}
              content="See requests"
            ></Button>
          </Link>
        </div>
      </div>

      <Accordion>
        {sectiuni.map((sectiune, i) => {
          return (
            <AccordionTab header={sectiune.denumire} key={i}>
              <div>
                <h2>Numele secțiunii: {sectiune.denumire}</h2>
                <div>
                  Descrierea secțiunii: {sectiune.descriere}
                  <button
                    className={style.iconBtn}
                    onClick={() => changeSomething("descriere")}
                  >
                    <FontAwesomeIcon icon={faPencil} className={style.icon} />
                  </button>
                </div>
              </div>
              <div>
                <h3>Resursa video: </h3>
                <div>
                  <Link to={sectiune.resurse.linkVideo} className={style.link}>
                    {
                      sectiuni[i].resurse.filter(
                        (x) => x.tip_resursa === "video_link"
                      )[0].titlu_resursa
                    }
                  </Link>
                  <button
                    className={style.iconBtn}
                    onClick={() => changeSomething("video")}
                  >
                    <FontAwesomeIcon icon={faPencil} className={style.icon} />
                  </button>
                </div>
                <div className={style.rowPDFS}>
                  <h3>Resursele Document:</h3>

                  <FileUpload
                    ref={(el) =>
                      (fileUploadRefs.current[sectiune.id_sectiune] = el)
                    }
                    mode="basic"
                    name="demo[]"
                    accept="application/pdf"
                    customUpload={true}
                    uploadHandler={(e) => onUpload(e, sectiune.id_sectiune)}
                    auto
                    chooseLabel={"Adaugă"}
                  />
                </div>

                <div>
                  {sectiuni[i].resurse
                    .filter((x) => x.tip_resursa === "pdf_path")
                    .map((pdf) => {
                      return (
                        <div key={pdf.id_resursa}>
                          {pdf.titlu_resursa}
                          <button
                            className={style.iconBtn}
                            onClick={() => deleteResource(pdf.id_resursa)}
                          >
                            <FontAwesomeIcon
                              className={style.faTrash}
                              icon={faTrash}
                            />
                          </button>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <h3>Lista de cerințe:</h3>
                  <div>
                    {sectiune.cerinte.map((assigment) => {
                      return (
                        <div
                          key={assigment.id_cerinta}
                          className={style.assigment}
                        >
                          <h4>Titlul cerinței: {assigment.titlu}</h4>
                          <div className={style.requirementRow}>
                            <div>Cerința: {assigment.cerinta}</div>
                            {
                              //maybe pun functionalitate de delete + add, fara modificare
                            }
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Button
                  content={"Editează testul"}
                  className={`${style.btn} ${style.btnEditTest}`}
                ></Button>
              </div>
            </AccordionTab>
          );
        })}
      </Accordion>
    </div>
  );
}

export default CourseStatus;
