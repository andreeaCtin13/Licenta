import React, { useContext, useEffect } from "react";
import currentUser from "../../data/mentor.json";
import { UserContext } from "../../context/UserContext";
import style from "../../styles/mentor/NewCourse.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUpload } from "@fortawesome/free-solid-svg-icons";

function NewCourse() {
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    setUser(currentUser);
  }, []);
  return (
    <div className={style.mainContainer}>
      <h1>Create a new course</h1>
      <form action="">
        <div className={style.formRow}>
          <label htmlFor="">Title of the course</label>
          <input type="text" />
        </div>
        <div className={style.formRow}>
          <label htmlFor="">Description</label>
          <input type="text" />
        </div>
        <div className={style.formRow}>
          <label htmlFor="">Number of the sections</label>
          <input type="number" max={100} min={1} />
        </div>
        <div className={style.btnSection}>
          <button className={style.btn}>
            Presentation Picture
            <FontAwesomeIcon icon={faUpload} className={style.icon} />
          </button>
          <button className={style.btn}>
            Create Sections
            <FontAwesomeIcon icon={faArrowRight} className={style.icon} />
          </button>
        </div>
      </form>
      <button className={`${style.btn} ${style.btnCancel}`}>CANCEL</button>
    </div>
  );
}

export default NewCourse;
