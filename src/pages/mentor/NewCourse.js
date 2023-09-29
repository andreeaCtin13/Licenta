import React, { useContext, useEffect } from "react";
import currentUser from "../../data/mentor.json";
import { UserContext } from "../../context/UserContext";
import style from "../../styles/mentor/NewCourse.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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

        <div className={style.btnSection}>
          <button className={style.btn}>
            Presentation Picture
            <FontAwesomeIcon icon={faUpload} className={style.icon} />
          </button>
        </div>
      </form>
      <div className={style.sectionBtns}>
        <Link to="/mentor-homepage" className={style.link}>
          <button className={`${style.btn} ${style.btnCancel}`}>CANCEL</button>
        </Link>
        <button className={`${style.btn} ${style.btnCreate}`}>CREATE</button>
      </div>
    </div>
  );
}

export default NewCourse;
