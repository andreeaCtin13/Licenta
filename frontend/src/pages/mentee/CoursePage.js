import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import style from "../../styles/mentee/Course.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown, faComment } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Dialog } from "primereact/dialog";

function CoursePage() {
  const [dialog, setDialog] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState();
  const { idCourse } = useParams();
  const { user } = useContext(UserContext);
  const [cerinte, setCerinte] = useState([]);
  const [resurse, setResurse] = useState([]);
  const [files, setFiles] = useState([]);
  const toast = useRef(null);
  const [courseChosen, setCourseChosen] = useState();
  const [stare, setStare] = useState();
  const fileUploadRefs = useRef({});
  const [feedback, setFeedback] = useState(null);

  const playVideo = (index) => {
    setCurrentSectionIndex(index);
    updateInfo(index);
  };

  const getIstoric = async (idSectiune) => {
    try {
      const rez = await axios.get(`http://localhost:8080/istoricuriPunctaje/getLastIstoricOfAUser/${user.id_utilizator}/${idSectiune}`);

      if (rez.data.message === "nu exista istoric") {
        setStare({ exists: false });
      } else if (rez.data.message === "ok") {
        setStare({ exists: true, lastHistory: rez.data.lastHistory });
      }
    } catch (err) {
      console.log(err);
    }
  };



  const setData = async () => {
    console.log("INTRU AICI NICU STEFANUTA")
    try {
      const rez = await axios.get(`http://localhost:8080/curs/getById/${idCourse}`);
      let curs_data = rez.data.curs;
      console.log(curs_data);

      const userRes = await axios.get(`http://localhost:8080/useri/getUserNameById/${curs_data.id_utilizator}`);
      curs_data = { ...curs_data, mentor: userRes.data };

      const sectRes = await axios.get(`http://localhost:8080/sectiuni/selectAll/${idCourse}`);
      setCurrentSectionIndex(sectRes.data.sectiuni[0].id_sectiune);

      const sectiuni = sectRes.data.sectiuni;
      getIstoric(sectRes.data.sectiuni[0].id_sectiune);

      setCourseChosen({ ...curs_data, sectiuni });

      const cerinteRes = await axios.get(`http://localhost:8080/cerinte/getAllCerinte/${sectiuni[0].id_sectiune}`);
      setCerinte(cerinteRes.data.cerinte);

      const resurseRes = await axios.get(`http://localhost:8080/resurse/getResurseCursSection/${sectiuni[0].id_sectiune}`);
      setResurse(resurseRes.data.resurse);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    setData()
  },[idCourse])

  const uploadFile = async (file, id) => {
    let formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`http://localhost:8080/istoricCerinte/upload/${id}/${user.id_utilizator}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.current.show({ severity: "info", summary: "Success", detail: "File Uploaded" });
      fileUploadRefs.current[id].clear();
    } catch (err) {
      console.log(err);
      toast.current.show({ severity: "error", summary: "Failed", detail: "File upload failed" });
    }
  };

  const onUpload = ({ files }, id) => {
    const [file] = files;
    uploadFile(file, id);
  };

  const updateInfo = async (index) => {
    try {
      const cerinteRes = await axios.get(`http://localhost:8080/cerinte/getAllCerinte/${index}`);
      setCerinte(cerinteRes.data.cerinte);

      const resurseRes = await axios.get(`http://localhost:8080/resurse/getResurseCursSection/${index}`);
      setResurse(resurseRes.data.resurse);
    } catch (err) {
      console.log(err);
    }
  };

  const downloadPDF = async (id) => {
    try {
      const response = await axios({
        url: `http://localhost:8080/resurse/download/${id}`,
        method: "GET",
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  useEffect(() => {
    setData();
  }, []);

  const getFeedbackAssig = async (id) => {
    setDialog(true);
    console.log(id);
    try {
      const response = await axios.get(`http://localhost:8080/istoricCerinte/getLastFeedback/${user.id_utilizator}/${id}`);
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error("Error fetching last feedback:", error);
    }
  };

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
              Susținut de {courseChosen.mentor.nume} ({courseChosen.mentor.mail})
            </div>
            <div className={style.description}>{courseChosen.descriere}</div>
          </div>
          <h2>Resurse Video</h2>

          <div className={style.containerVideo}>
            <div className={style.video}>
              <ReactPlayer
                url={
                  resurse.length > 0 && resurse.some((x) => x.tip_resursa === "video_link")
                    ? resurse.find((x) => x.tip_resursa === "video_link").link_resursa
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
                    section.id_sectiune === currentSectionIndex ? style.selectedVideo : ""
                  }`}
                  onClick={() => {
                    playVideo(section.id_sectiune);
                    getIstoric(section.id_sectiune);
                  }}
                >
                  <h3 className={style.videoPlaylistRowTitle}>{section.denumire}</h3>
                </div>
              ))}
            </div>
          </div>
          <div className={style.containerPDFS}>
            <h2>Resurse PDF</h2>
            <div className={style.pdfs}>
              {resurse.filter((x) => x.tip_resursa === "pdf_path").length > 0 ? (
                resurse
                  .filter((x) => x.tip_resursa === "pdf_path")
                  .map((x, index) => (
                    <button
                      key={index}
                      className={style.btnPDFS}
                      onClick={() => downloadPDF(x.id_resursa)}
                    >
                      <div>{x.titlu_resursa}</div>
                      <div>
                        <FontAwesomeIcon icon={faAnglesDown} />
                      </div>
                    </button>
                  ))
              ) : (
                <div>Nu sunt disponibile resurse PDF</div>
              )}
            </div>
          </div>

          <h2>Cerințe Tema</h2>
          {cerinte.map((cerinta, index) => (
            <div key={index} className={style.gridContainerCerinte}>
              <p className={style.label}>
                Cerința {index + 1} : {cerinta.titlu}

              </p>
              <p>{cerinta.cerinta}</p>
              <div className={style.flexContainer}>
              <FileUpload
                name="file"
                accept="*"
                customUpload
                uploadHandler={(e) => onUpload(e, cerinta.id_cerinta)}
                className={style.customFileUpload}
                emptyTemplate={<p className="m-0">Glisează fișierul aici pentru a încărca.</p>}
                ref={(el) => (fileUploadRefs.current[cerinta.id_cerinta] = el)}
              />
              <div className={`${style.commentIconContainer}${style.setFeedback}`}>
                <FontAwesomeIcon
                  className={style.commentIcon}
                  icon={faComment}
                  onClick={() => getFeedbackAssig(cerinta.id_cerinta)}
                />
              </div>
              </div>
            </div>
          ))}

          <Dialog
            header="Header"
            visible={dialog}
            style={{ width: "50vw" }}
            onHide={() => {setDialog(false)
              setFeedback(null)
            }}
          >
            {feedback ? (
              <p>Feedback-ul mentorului: {feedback}</p>
            ) : (
              <p>Mentorul încă nu a acordat feedback</p>
            )}
          </Dialog>

          <div className={style.containerTest}>
            <h2>Test de verificare</h2>
            {stare ? (
              stare.exists === false ? (
                <Link
                  className={style.testBtnLink}
                  to={`/test/${currentSectionIndex ?? ""}/${idCourse}`}
                >
                  <Button content={"Start"} className={style.testBtn} />
                  {                console.log("intra pe acesta ramuna")
                  }
                </Link>
              ) : (
                stare.lastHistory && (
                  <div className={style.containerStatusUltimulTest}>
                    {stare.lastHistory.istoric && stare.lastHistory.istoric.punctaj_obtinut <
                      stare.lastHistory.punctaj_minim_promovare ? (
                      <div className={style.failed}>
                        <div>
                          Ultimul punctaj obținut: {stare.lastHistory.istoric.punctaj_obtinut} pct.
                        </div>
                        <div>
                          Punctaj minim promovare: {stare.lastHistory.punctaj_minim_promovare} pct.
                        </div>
                        <Link
                      className={style.testBtnLink}
                      to={`/test/${currentSectionIndex ?? ""}/${idCourse}`}
                    >
                      <Button content={"Start"} className={style.testBtn} />
                    </Link>
                      </div>
                    ) : (
                      <div className={style.passed}>A fost trecut testul!</div>
                    )}
                   
                  </div>
                )
              )
            ) : (
              <div>Nu s-a putut incarca istoricul testelor</div>
            )}
          </div>
        </div>
      ) : (
        <div>Nu există cursuri</div>
      )}
    </div>
  );
}

export default CoursePage;
