import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import style from "../../styles/mentee/Course.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Toast } from "primereact/toast";

function CoursePage() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState();
  const { idCourse } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [cerinte, setCerinte] = useState([]);
  const [resurse, setResurse] = useState([]);
  const [files, setFiles] = useState([]);
  const toast = useRef(null);
  const [courseChosen, setCourseChosen] = useState();
  const [stare, setStare] = useState();

  const playVideo = (index) => {
    setCurrentSectionIndex(index);
    console.log("PLAY VIDEO", index);
    updateInfo(index);
  };

  const getIstoric = async (idSectiune) => {
    await axios
      .get(
        `http://localhost:8080/istoricuriPunctaje/getLastIstoricOfAUser/${user.id_utilizator}/${idSectiune}`
      )
      .then((rez) => {
        console.log("istoric:", rez.data);

        if (rez.data.message === "nu exista istoric") {
          setStare({
            exists: false,
          });
        } else if (rez.data.message === "ok") {
          setStare({
            exists: true,
            lastHistory: rez.data.lastHistory,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setData = async () => {
    await axios
      .get(`http://localhost:8080/curs/getById/${idCourse}`)
      .then(async (rez) => {
        let curs_data = rez.data.curs;
        console.log(curs_data);

        await axios
          .get(
            `http://localhost:8080/useri/getUserNameById/${curs_data.id_utilizator}`
          )
          .then((rez) => {
            curs_data = { ...curs_data, mentor: rez.data };
          })
          .catch((err) => console.log(err));

        await axios
          .get(`http://localhost:8080/sectiuni/selectAll/${idCourse}`)
          .then(async (rez) => {
            setCurrentSectionIndex(rez.data.sectiuni[0].id_sectiune);

            const sectiuni = rez.data.sectiuni;
            getIstoric(rez.data.sectiuni[0].id_sectiune);

            setCourseChosen({ ...curs_data, sectiuni });

            await axios
              .get(
                `http://localhost:8080/cerinte/getAllCerinte/${sectiuni[0].id_sectiune}`
              )
              .then((rez) => {
                setCerinte(rez.data.cerinte);
              })
              .catch((err) => {
                console.log(err);
              });

            await axios
              .get(
                `http://localhost:8080/resurse/getResurseCursSection/${sectiuni[0].id_sectiune}`
              )
              .then((rez) => {
                setResurse(rez.data.resurse);
              })
              .catch((err) => {
                console.log(err);
              });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileChange = (e, index) => {
    const selectedFile = e.target.files[0];
    let updatedFiles = [...files];
    updatedFiles[index] = selectedFile;
    setFiles(updatedFiles);
  };

  const uploadAssigment = async (id, index) => {
    console.log("INDEX:", index);
    console.log(files[index]);
    if (!files[index]) {
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "trebuie sa incarci un fisier pentru a uploada",
        life: 3000,
      });
      return;
    }

    let formData = new FormData();
    formData.append("file", files[index]);

    try {
      await axios.post(
        `http://localhost:8080/istoricCerinte/upload/${id}/${user.id_utilizator}`,
        formData
      );

      toast.current.show({
        severity: "succes",
        summary: "Succes",
        detail: "Felicitari! Ai incarcat rezolvarea!",
        life: 3000,
      });
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "trebuie sa incarci un fisier pentru a uploada",
        life: 3000,
      });
      console.log("Error uploading file:", err);
    }
  };

  const updateInfo = async (index) => {
    await axios
      .get(`http://localhost:8080/cerinte/getAllCerinte/${index}`)
      .then((rez) => {
        setCerinte(rez.data.cerinte);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`http://localhost:8080/resurse/getResurseCursSection/${index}`)
      .then((rez) => {
        setResurse(rez.data.resurse);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <div className={style.mainContainer}>
      <Toast ref={toast} />

      {courseChosen ? (
        <div>
          <div className={style.introductionSection}>
            {courseChosen.denumire ? (
              <h1>{courseChosen.denumire}</h1>
            ) : (
              <h1>eroare</h1>
            )}
            <div className={style.mentor}>
              Susținut de {courseChosen.mentor.nume} ({courseChosen.mentor.mail}
              )
            </div>
            <div className={style.description}>{courseChosen.descriere}</div>
          </div>
          <h2>Resurse Video</h2>

          <div className={style.containerVideo}>
            <div className={style.video}>
              <ReactPlayer
                url={
                  resurse != []
                    ? resurse.filter((x) => x.tip_resursa === "video_link")[0]
                      ? resurse.filter((x) => x.tip_resursa === "video_link")[0]
                          .link_resursa
                      : ""
                    : "https://youtu.be/MTOiveIjRc0?si=jnIFMgnewLh8iose"
                }
                width={450}
                controls={true}
              />
            </div>
            <div className={style.videoPlaylistContainer}>
              {courseChosen.sectiuni.map((section, index) => (
                <div
                  key={index}
                  className={`${style.videoPlaylistRow} ${
                    section.id_sectiune === currentSectionIndex
                      ? style.selectedVideo
                      : ""
                  }`}
                  onClick={() => {
                    playVideo(section.id_sectiune);
                    getIstoric(section.id_sectiune);
                  }}
                >
                  <h3 key={index} className={style.videoPlaylistRowTitle}>
                    {section.denumire}
                  </h3>
                </div>
              ))}
            </div>
          </div>
          <div className={style.containerPDFS}>
            <h2>Resurse PDF</h2>
            <div className={style.pdfs}>
              {resurse.filter((x) => x.tip_resursa === "pdf_path").length >
              0 ? (
                resurse
                  .filter((x) => x.tip_resursa === "pdf_path")
                  .map((x, index) => {
                    return (
                      <button key={index} className={style.btnPDFS}>
                        <div>{x.titlu_resursa}</div>
                        <div>
                          <FontAwesomeIcon icon={faAnglesDown} />
                        </div>
                      </button>
                    );
                  })
              ) : (
                <div>Nu sunt disponibile resurse PDF</div>
              )}
            </div>
          </div>

          <div className={style.containerAssigments}>
            <h2>Cerințe</h2>
            {cerinte.map((x, index) => {
              return (
                <div className={style.assigment} key={index}>
                  <h3>{x.titlu}</h3>
                  <div className={style.assigmentRow}>
                    <div>{x.cerinta}</div>
                    <input
                      type="file"
                      content="Selecteaza fisier"
                      onChange={(e) => handleFileChange(e, index)}
                    />
                    <Button
                      className={style.assigmentBtn}
                      content="Încarcă"
                      onClick={() => uploadAssigment(x.id_cerinta, index)}
                    ></Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={style.containerTest}>
            <h2>Test de verificare</h2>
            {stare ? (
              stare.exists === false ? (
                <Link
                  className={style.testBtnLink}
                  to={`/test/${
                    currentSectionIndex !== undefined ? currentSectionIndex : ""
                  }/${idCourse}`}
                  onClick={() => {
                    console.log("Course chosen:", courseChosen);
                    console.log("Current section index:", currentSectionIndex);
                  }}
                >
                  <Button content={"Start"} className={style.testBtn}></Button>
                </Link>
              ) : stare.lastHistory ? (
                stare.lastHistory.istoric ? (
                  stare.lastHistory.istoric.punctaj_obtinut <
                  stare.lastHistory.punctaj_minim_promovare ? (
                    <div className={style.containerStatusUltimulTest}>
                      <div className={style.failed}>
                        <div>
                          Ultimul punctaj obținut:{" "}
                          {stare.lastHistory.istoric.punctaj_obtinut} pct.
                        </div>
                        <div>
                          Punctaj minim promovare:{" "}
                          {stare.lastHistory.punctaj_minim_promovare} pct.
                        </div>
                      </div>
                      <Link
                        className={style.testBtnLink}
                        to={`/test/${
                          currentSectionIndex !== undefined
                            ? currentSectionIndex
                            : ""
                        }/${idCourse}`}
                        onClick={() => {
                          console.log("Course chosen:", courseChosen);
                          console.log(
                            "Current section index:",
                            currentSectionIndex
                          );
                        }}
                      >
                        <Button
                          content={"Start"}
                          className={style.testBtn}
                        ></Button>
                      </Link>
                    </div>
                  ) : (
                    <div className={style.passed}>A fost trecut testul!</div>
                  )
                ) : (
                  <div></div>
                )
              ) : (
                <div></div>
              )
            ) : (
              <div>Nu s-a putut incarca istoricul testelor</div>
            )}
          </div>
        </div>
      ) : (
        <div>jnbfre</div>
      )}
    </div>
  );
}

export default CoursePage;
