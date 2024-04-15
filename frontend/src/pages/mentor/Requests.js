import React from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import style from "../../styles/mentor/Requests.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Requests() {
  return (
    <div className={style.mainContainer}>
      <div className={style.btnZone}>
        <Link to={"/mentor-homepage"}>
          <Button
            className={style.btnBack}
            content={<FontAwesomeIcon icon={faArrowLeft} />}
          ></Button>
        </Link>
      </div>
      <h1>Requests</h1>

      {/* TO DO CREATE A TABLE AND DO A CALL TO BACKEND FOR THE REQUEST WITH PAGINATION AND FILTER (JUST THE PENDING REQUESTS) */}
    </div>
  );
}

export default Requests;
