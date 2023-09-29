import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import currentUser from "../../data/mentor.json";
import { useParams } from "react-router";
import style from "../../styles/mentor/CourseStatus.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Accordion, AccordionTab } from "primereact/accordion";

function CourseStatus() {
  const { user, setUser } = useContext(UserContext);
  const { idCourse } = useParams();

  useEffect(() => {
    setUser(currentUser);
  }, []);
  const currentClass = currentUser.classes[idCourse];

  return (
    <div className={style.mainContainer}>
      <h1>{currentClass.topic}</h1>
      <Accordion>
        {currentClass.sectiuni.map((sectiune) => {
          return (
            <AccordionTab header={sectiune.titlu}>
              {" "}
              <div>
                <h2>
                  Section name: {sectiune.titlu}
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
                    {sectiune.resurse.linkVideo}
                  </Link>
                  <button className={style.iconBtn}>
                    <FontAwesomeIcon icon={faPencil} className={style.icon} />
                  </button>
                </div>
                <h3>PDFs Resources:</h3>
                <div>
                  {sectiune.resurse.pdfList.map((pdf) => {
                    return (
                      <div>
                        {pdf.titlu}
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
                    {sectiune.resurse.AssigmentsList.map((assigment) => {
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
                <button className={style.btnEditTest}>
                  {sectiune.resurse.test !== undefined ? (
                    <div>Edit test</div>
                  ) : (
                    <div>Create a test</div>
                  )}
                </button>
              </div>
            </AccordionTab>
          );
        })}
      </Accordion>
    </div>
  );
}

export default CourseStatus;
