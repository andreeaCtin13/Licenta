import React, { useState, useEffect } from "react";
import style from "../../styles/mentor/AnalizaPerformanta.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useParams } from "react-router";
import { faArrowLeft, faChampagneGlasses } from "@fortawesome/free-solid-svg-icons";
import PieChart from "../../components/mentor/PieChart";
import LineChart from "../../components/mentor/LineChart";

function AnalizaPerformanta() {
  const { idCourse } = useParams();
 

  return (
    <div className={style.mainContainer}>
      <Link to={`/mentor-homepage/${idCourse}`}>
        <Button
          className={style.btnBack}
          content={<FontAwesomeIcon icon={faArrowLeft} />}
        ></Button>
      </Link>
      <div className={style.containerCharts}>
        <div>
          <h1>Ponderea de reușită în cadrul testelor</h1>
          <div   className={style.chart}>
              <PieChart idCourse={idCourse}/>
          </div>
        </div>

        <div  className={style.chart}>
          <LineChart idCourse={idCourse}></LineChart>
          <h1>Evoluția rezultatelor în ultimele luni</h1>

        </div>
      </div>
     
    </div>
  );
}

export default AnalizaPerformanta;
