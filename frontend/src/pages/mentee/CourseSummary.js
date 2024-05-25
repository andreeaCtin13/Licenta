import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router";
import style from "../../styles/mentee/CourseSummary.module.css";
import { Accordion, AccordionTab } from "primereact/accordion";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/Button";
import axios from "axios";
import { Toast } from "primereact/toast";

function CourseSummary() {
  const { idCourse } = useParams();
  const [requestStatus, setRequestStatus] = useState("unenrolled");
  const [requestId, setRequestId] = useState(null);
  const { user } = useContext(UserContext);
  const toast = useRef(null);
  const [course, setCourse] = useState({});

  const verifyRequestExists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/cereriCurs/getAllCursuriALLOfAUser/${user.id_utilizator}`
      );
      const request = response.data.rezultat.find(
        (x) => x.id_curs === Number(idCourse)
      );
      if (!request) {
        setRequestStatus("unenrolled");
      } else {
        setRequestStatus(request.status);
        setRequestId(request.id_cerere);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const takeCourse = async () => {
    try {
      const courseResponse = await axios.get(
        `http://localhost:8080/curs/getById/${idCourse}`
      );
      setCourse((prevState) => ({ ...prevState, ...courseResponse.data.curs }));

      const sectionsResponse = await axios.get(
        `http://localhost:8080/sectiuni/selectAll/${idCourse}`
      );
      setCourse((prevState) => ({
        ...prevState,
        sectiuni: sectionsResponse.data.sectiuni,
      }));
    } catch (error) {
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Error loading sections",
        life: 3000,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    takeCourse();
    verifyRequestExists();
  }, []);

  const handleEnroll = async () => {
    try {
      if (requestStatus === "unenrolled" || requestStatus === "declined") {
        const response = await axios.post(
          "http://localhost:8080/cereriCurs/exists",

          {
            id_utilizator: Number(user.id_utilizator),
            id_curs: Number(idCourse),
          }
        );
        console.log(response.data.message);
        if (response.data.message === "nope") {
          await axios.post("http://localhost:8080/cereriCurs/insert", {
            id_utilizator: user.id_utilizator,
            id_curs: Number(idCourse),
            status: "pending",
          });
          setRequestStatus("pending");
        } else if (response.data.message === "exists") {
          console.log("Request already exists");

          await axios
            .put(`http://localhost:8080/cereriCurs/update/${requestId}`, {
              status: "pending",
            })
            .then(() => {
              setRequestStatus("pending");
            });
        }
      } else {
        await axios
          .put(`http://localhost:8080/cereriCurs/update/${requestId}`, {
            status: "declined",
          })
          .then(() => {
            setRequestStatus("declined");
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.mainContainer}>
      <Toast ref={toast} />

      <h1>{course.denumire}</h1>
      <div className={style.flexContainer}>
        <div className={style.leftContainer}>
          <img
            src={course.imagine_reprezentativa}
            alt=""
            className={style.courseImage}
          />
        </div>
        <div className={style.rightContainer}>
          <h2>Why enroll in this course?</h2>
          <div className={style.rightContainerDesc}>{course.descriere}</div>
          {requestStatus === "accepted" ? (
            <Button
              content={"Unenroll"} // Corrected typo
              className={`${style.unEnrollBtn} ${style.btn}`}
              onClick={handleEnroll}
            />
          ) : (
            <Button
              className={`${style.btn} ${
                requestStatus === "enroll"
                  ? style.enrollBtn
                  : requestStatus === "pending"
                  ? style.pendingBtn
                  : style.unEnrollBtn
              }`}
              onClick={handleEnroll}
              content={requestStatus}
            />
          )}
        </div>
      </div>
      <div className={style.accordion}>
        <Accordion>
          {course.sectiuni ? (
            course.sectiuni.map((section) => (
              <AccordionTab
                key={section.id_sectiune}
                header={section.denumire}
                className={style.accordionRow}
              >
                <p className={`m=0 accordionDescription`}>
                  {section.descriere}
                </p>
              </AccordionTab>
            ))
          ) : (
            <div></div>
          )}
        </Accordion>
      </div>
    </div>
  );
}

export default CourseSummary;
