import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import currentUser from "../../data/mentor.json";
import { useParams } from "react-router";
import style from "../../styles/mentor/CourseStatus.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Accordion, AccordionTab } from "primereact/accordion";
import Button from "../../components/Button";
import axios from "axios";
import { Toast } from "primereact/toast";

function CourseStatus() {
  const { user, setUser } = useContext(UserContext);
  const { idCourse } = useParams();
  const [sectiuni, setSectiuni] = useState([]);
  const toast = useRef(null);
  const [curs, setCurs] = useState({});

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

  return (
    <div className={style.mainContainer}>
      <Toast ref={toast} />
      <h1>{curs.denumire}</h1>
      <div>
        <Link to={`/new-section/${idCourse}`}>
          <Button
            className={style.btnCreateSection}
            content="Create a new section"
          ></Button>
        </Link>
      </div>
      <div className={style.btnCreateZone}>
        <Link to={`/requests/${idCourse}`}>
          <Button className={style.btnCreate} content="See requests"></Button>
        </Link>
      </div>
      <Accordion>
        {sectiuni.map((sectiune, i) => {
          return (
            <AccordionTab header={sectiune.denumire} index={i}>
              {" "}
              <div>
                <h2>
                  Section name: {sectiune.denumire}
                  <button className={style.iconBtn}>
                    <FontAwesomeIcon icon={faPencil} className={style.icon} />
                  </button>
                </h2>
                <div>
                  Section description: {sectiune.descriere}
                  <button className={style.iconBtn}>
                    <FontAwesomeIcon icon={faPencil} className={style.icon} />
                  </button>
                </div>
              </div>
              <div>
                <h3>Video Link: </h3>
                <div>
                  <Link to={sectiune.resurse.linkVideo} className={style.link}>
                    {
                      sectiuni[i].resurse.filter(
                        (x) => x.tip_resursa === "video_link"
                      )[0].titlu_resursa
                    }
                  </Link>
                  <button className={style.iconBtn}>
                    <FontAwesomeIcon icon={faPencil} className={style.icon} />
                  </button>
                </div>
                <h3>PDFs Resources:</h3>
                <div>
                  {sectiuni[0].resurse
                    .filter((x) => x.tip_resursa === "pdf_path")
                    .map((pdf) => {
                      return (
                        <div>
                          {pdf.titlu_resursa}
                          <button className={style.iconBtn}>
                            <FontAwesomeIcon
                              icon={faPencil}
                              className={style.icon}
                            />
                          </button>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <h3>Assigments list</h3>
                  <div>
                    {sectiune.cerinte.map((assigment) => {
                      return (
                        <div className={style.assigment}>
                          <h4>Title of the assigment: {assigment.titlu}</h4>
                          <div className={style.requirementRow}>
                            <div>Requirement: {assigment.cerinta}</div>
                            <button className={style.iconBtn}>
                              <FontAwesomeIcon
                                icon={faPencil}
                                className={`${style.icon} ${style.purpleIcon}`}
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Button
                  content={"Edit test"}
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
