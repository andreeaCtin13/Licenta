import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import style from "../../styles/mentee/CourseSummary.module.css";
import { Accordion, AccordionTab } from "primereact/accordion";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button";
import axios from "axios";
import { Toast } from "primereact/toast";

function CourseSummary() {
  const { idCourse } = useParams();
  const [requestStatus, setRequestStatus] = useState("Enroll");
  const { user, setUser } = useContext(UserContext);
  const toast = useRef(null);

  const [curs, setCurs] = useState({});

  const takeCourse = async () => {
    await axios
      .get(`http://localhost:8080/curs/getById/${idCourse}`)
      .then((rez) => {
        setCurs((prevState) => ({ ...prevState, ...rez.data.curs }));
      })
      .catch(() => {});

    await axios
      .get(`http://localhost:8080/sectiuni/selectAll/${idCourse}`)
      .then((result) => {
        setCurs((prevState) => ({
          ...prevState,
          sectiuni: result.data.sectiuni,
        }));
      })
      .catch((err) => {
        toast.current.show({
          severity: "fail",
          summary: "Failed",
          detail: "eroare incarcare sectiuni",
          life: 3000,
        });
      });
  };

  useEffect(() => {
    takeCourse();
  }, []);
  //TO DO: CAND AI BAZA DE DATE TREBUIE SA FACI FUNCTIA ASINCRONA PANA AJUNGI SA AI RASPUNSUL DE LA MENTOR, DACA E PRIMIT SAU NU IN CADRUL CURSULUI
  const handleEnroll = () => {
    setRequestStatus("pending");

    setTimeout(() => {
      setRequestStatus(requestStatus === "enroll" ? "unenroll" : "enroll");
    }, 2000);
  };

  return (
    <div className={style.mainContainer}>
      <Toast ref={toast} />

      <h1>{curs.denumire}</h1>
      <div className={style.flexContainer}>
        <div className={style.leftContainer}>
          <img
            src={curs.imagine_reprezentativa}
            alt=""
            className={style.courseImage}
          />
        </div>
        <div className={style.rightContainer}>
          <h2>Why to enroll to this course?</h2>
          <div className={style.rightContainerDesc}>{curs.descriere}</div>
          <Button
            className={`${style.btn} ${
              requestStatus == "enroll"
                ? style.enrollBtn
                : requestStatus === "pending"
                ? style.pendingBtn
                : style.unEnrollBtn
            }`}
            onClick={handleEnroll}
            content={requestStatus}
          ></Button>
        </div>
      </div>
      <div className={style.accordion}>
        <Accordion>
          {curs.sectiuni ? (
            curs.sectiuni.map((s) => {
              return (
                <AccordionTab
                  key={s.id_sectiune}
                  header={s.denumire}
                  className={style.accordionRow}
                >
                  <p className={`m=0 accordionDescription`}>{s.descriere}</p>
                </AccordionTab>
              );
            })
          ) : (
            <div></div>
          )}
        </Accordion>
      </div>
    </div>
  );
}

export default CourseSummary;
